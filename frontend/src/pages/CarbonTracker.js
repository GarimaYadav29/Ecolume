import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/carbon.css";

const CarbonTracker = () => {
  const [formData, setFormData] = useState({
    date: "",
    carDistance: "",
    publicTransportDistance: "",
    vegMeals: "",
    nonVegMeals: "",
    acHours: "",
    cookingHours: "",
    renewableEnergy: "no",
    totalCarbon: "",
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  // History state
  const [historyData, setHistoryData] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const limits = {
    carDistance: 100,
    publicTransportDistance: 100,
    vegMeals: 5,
    nonVegMeals: 5,
    acHours: 12,
    cookingHours: 6,
  };

  const carbonFactors = {
    carDistance: 0.23,
    publicTransportDistance: 0.05,
    vegMeals: 0.1,
    nonVegMeals: 0.5,
    acHours: 0.9,
    cookingHours: 0.3,
    renewableEnergy: -2,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    Object.keys(limits).forEach((key) => {
      if (formData[key] && Number(formData[key]) > limits[key]) {
        newErrors[key] = `Limit exceeded! Maximum allowed is ${limits[key]}`;
      }
    });

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    let total = 0;
    total +=
      (parseFloat(formData.carDistance) || 0) * carbonFactors.carDistance;
    total +=
      (parseFloat(formData.publicTransportDistance) || 0) *
      carbonFactors.publicTransportDistance;
    total += (parseFloat(formData.vegMeals) || 0) * carbonFactors.vegMeals;
    total +=
      (parseFloat(formData.nonVegMeals) || 0) * carbonFactors.nonVegMeals;
    total += (parseFloat(formData.acHours) || 0) * carbonFactors.acHours;
    total +=
      (parseFloat(formData.cookingHours) || 0) * carbonFactors.cookingHours;
    if (formData.renewableEnergy === "yes")
      total += carbonFactors.renewableEnergy;

    const message =
      total > 10
        ? "⚠️ Your carbon emissions are high! Try to reduce."
        : "✅ Great job! Your emissions are within the limit.";

    setResult({ totalCarbon: total.toFixed(2), message });
    setFormData((prev) => ({ ...prev, totalCarbon: total.toFixed(2) }));

    try {
      await axios.post("http://localhost:5000/api/emissions", {
        ...formData,
        totalCarbon: total,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewHistory = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/api/emissions");
      setHistoryData(resp.data);
      setShowHistory(true);
    } catch (err) {
      console.error("Failed to fetch history", err);
    }
  };

  return (
    <div className="carbon-tracker">
      <h2>Daily Carbon Footprint Tracker</h2>
      <form className="carbon-form" onSubmit={handleSubmit}>
        {/* Date */}
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>
        {/* Car Distance */}
        <div className="form-group">
          <label>Distance by Car (km):</label>
          <input
            type="number"
            name="carDistance"
            value={formData.carDistance}
            onChange={handleChange}
          />
          {errors.carDistance && (
            <span className="error">{errors.carDistance}</span>
          )}
        </div>
        {/* Public Transport */}
        <div className="form-group">
          <label>Distance by Public Transport (km):</label>
          <input
            type="number"
            name="publicTransportDistance"
            value={formData.publicTransportDistance}
            onChange={handleChange}
          />
          {errors.publicTransportDistance && (
            <span className="error">{errors.publicTransportDistance}</span>
          )}
        </div>
        {/* Veg Meals */}
        <div className="form-group">
          <label>Vegetarian Meals Eaten:</label>
          <input
            type="number"
            name="vegMeals"
            value={formData.vegMeals}
            onChange={handleChange}
          />
          {errors.vegMeals && <span className="error">{errors.vegMeals}</span>}
        </div>
        {/* Non-Veg Meals */}
        <div className="form-group">
          <label>Non-Vegetarian Meals Eaten:</label>
          <input
            type="number"
            name="nonVegMeals"
            value={formData.nonVegMeals}
            onChange={handleChange}
          />
          {errors.nonVegMeals && (
            <span className="error">{errors.nonVegMeals}</span>
          )}
        </div>
        {/* AC Hours */}
        <div className="form-group">
          <label>Hours of Air Conditioning Used:</label>
          <input
            type="number"
            name="acHours"
            value={formData.acHours}
            onChange={handleChange}
          />
          {errors.acHours && <span className="error">{errors.acHours}</span>}
        </div>
        {/* Cooking Hours */}
        <div className="form-group">
          <label>Hours of Cooking (Gas Stove):</label>
          <input
            type="number"
            name="cookingHours"
            value={formData.cookingHours}
            onChange={handleChange}
          />
          {errors.cookingHours && (
            <span className="error">{errors.cookingHours}</span>
          )}
        </div>
        {/* Renewable Energy */}
        <div className="form-group">
          <label>Used Renewable Energy at Home?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="renewableEnergy"
                value="yes"
                checked={formData.renewableEnergy === "yes"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="renewableEnergy"
                value="no"
                checked={formData.renewableEnergy === "no"}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>
        </div>
        {/* Total Carbon */}
        <div className="form-group">
          <label>Total Carbon (kg CO₂):</label>
          <input
            type="text"
            name="totalCarbon"
            value={formData.totalCarbon}
            readOnly
          />
        </div>
        <button type="submit" className="submit-btn">
          Calculate & Save
        </button>
      </form>

      {result && (
        <div className="result-card">
          <h3>Total Emissions: {result.totalCarbon} kg CO₂</h3>
          <p>{result.message}</p>
        </div>
      )}

      <button onClick={handleViewHistory} className="view-history-btn">
        View History
      </button>

      {showHistory && (
        <div className="history-container">
          <h3>Your Emission History</h3>
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total CO₂ (kg)</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((e) => (
                <tr key={e._id}>
                  <td>{new Date(e.date).toLocaleDateString()}</td>
                  <td>{e.totalCarbon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CarbonTracker;
