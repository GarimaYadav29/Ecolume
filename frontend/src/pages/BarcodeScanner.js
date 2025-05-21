import React, { useState, useEffect } from "react";
import Quagga from "quagga";
import "../styles/barcode.css";

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const NGROK_URL = "http://192.168.1.38:5000";

  const nutrientLimits = {
    sugar: 25,
    fat: 70,
    saturated_fat: 20,
    salt: 6,
    sodium: 2.3,
    carbohydrates: 300,
    proteins: 50,
    fiber: 25,
    "energy-kcal": 2000,
  };

  const evaluateNutrient = (name, value, quantity) => {
    if (!value || !quantity || isNaN(value) || isNaN(quantity)) return "N/A";
    const weight = parseFloat(quantity);
    const per100g = parseFloat(value);
    const actual = (weight / 100) * per100g;
    const limit = nutrientLimits[name];
    if (limit === undefined) return "N/A";

    return actual > limit
      ? `Excessive (${actual.toFixed(1)}g of ${limit}g limit)`
      : `Within limit (${actual.toFixed(1)}g of ${limit}g limit)`;
  };

  const fetchNutrition = async (code) => {
    try {
      setLoading(true);
      setNutrition(null);
      setAnalysis(null);
      setError("");

      const res = await fetch(`${NGROK_URL}/api/nutrition/${code}`);
      const data = await res.json();

      if (data.error) {
        setError("Product not found. Try another item.");
        return;
      }

      setNutrition(data);

      const quantityMatch = data.quantity.match(/\d+/);
      const quantity = quantityMatch ? parseFloat(quantityMatch[0]) : 100;

      const nutrients = {
        sugar: data.sugar,
        fat: data.fat,
        saturated_fat: data.saturated_fat,
        salt: data.salt,
        sodium: data.sodium,
        carbohydrates: data.carbs,
        proteins: data.protein,
        fiber: data.fiber,
        "energy-kcal": data.calories,
      };

      const evaluations = {};
      let anyExcess = false;
      let allMissing = true;

      for (let key in nutrients) {
        const result = evaluateNutrient(key, nutrients[key], quantity);
        evaluations[key] = result;
        if (result !== "N/A") allMissing = false;
        if (result.startsWith("Excessive")) anyExcess = true;
      }

      let verdict = "Healthy";
      if (allMissing) verdict = "Inconclusive (insufficient data)";
      else if (anyExcess) verdict = "Unhealthy (some nutrients exceed limits)";

      setAnalysis({ evaluations, verdict });
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to fetch or analyze data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDetected = (result) => {
    const code = result?.codeResult?.code;
    if (!code) return;
    setBarcode(code);
    Quagga.stop();
    Quagga.offDetected(handleDetected);
    fetchNutrition(code);
  };

  const startScanner = () => {
    setBarcode("");
    setNutrition(null);
    setAnalysis(null);
    setError("");

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner"),
          constraints: {
            facingMode: /Mobi|Android/i.test(navigator.userAgent)
              ? { exact: "environment" }
              : "user",
            width: { min: 640 },
            height: { min: 480 },
          },
        },
        decoder: {
          readers: ["ean_reader", "upc_reader"],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error("init error : ", err);
          setError("Camera initialization failed.");
          return;
        }
        Quagga.start();
        Quagga.onDetected(handleDetected);
      }
    );
  };

  useEffect(() => {
    return () => {
      if (Quagga && Quagga.stop && typeof Quagga.stop === "function") {
        try {
          Quagga.stop();
          Quagga.offDetected(handleDetected);
        } catch (err) {
          console.warn("Quagga cleanup error : ", err.message);
        }
      }
    };
  }, []);

  return (
    <>
      <div className="hero1">
        <h2>
          Scan a Barcode to See Nutrition Facts & Health Verdict for your
          product !
        </h2>
      </div>

      <div className="scanner-container">
        <div id="scanner" style={{ width: "100%", height: "400px" }}></div>
        <button className="btn" onClick={startScanner}>
          Start Scanning
        </button>

        {barcode && (
          <p>
            <strong>Scanned:</strong> {barcode}
          </p>
        )}
        {loading && <p style={{ color: "blue" }}>Loading nutrition info...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {nutrition && (
        <div className="nutrition-info">
          <h3>Nutrition Info</h3>
          <p>
            <strong>Product:</strong> {nutrition.product_name}
          </p>
          <p>
            <strong>Brand:</strong> {nutrition.brands}
          </p>
          <p>
            <strong>Quantity:</strong> {nutrition.quantity}
          </p>
          <p>
            <strong>Calories:</strong> {nutrition.calories} kcal
          </p>
          <p>
            <strong>Protein:</strong> {nutrition.protein} g
          </p>
          <p>
            <strong>Fat:</strong> {nutrition.fat} g
          </p>
          <p>
            <strong>Carbs:</strong> {nutrition.carbs} g
          </p>
        </div>
      )}

      {analysis && (
        <div className="analysis-info">
          <h3>Nutrient Analysis</h3>
          <ul>
            {Object.entries(analysis.evaluations).map(([nutrient, result]) => (
              <li key={nutrient}>
                <strong>{nutrient.replace("-", " ")}:</strong> {result}
              </li>
            ))}
          </ul>
          <p>
            <strong>Final Verdict:</strong> {analysis.verdict}
          </p>
        </div>
      )}
    </>
  );
};

export default BarcodeScanner;
