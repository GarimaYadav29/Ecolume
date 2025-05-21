const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/nutrition/:barcode", async (req, res) => {
  const { barcode } = req.params;
  try {
    const response = await axios.get(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    const data = response.data;

    if (data.status === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = data.product;
    const nutrients = product.nutriments || {};

    const result = {
      product_name: product.product_name || "N/A",
      brands: product.brands || "N/A",
      quantity: product.quantity || "100g",
      calories: nutrients["energy-kcal_100g"] || null,
      protein: nutrients.proteins_100g || null,
      fat: nutrients.fat_100g || null,
      saturated_fat: nutrients["saturated-fat_100g"] || null,
      carbs: nutrients.carbohydrates_100g || null,
      sugar: nutrients.sugars_100g || null,
      fiber: nutrients.fiber_100g || null,
      salt: nutrients.salt_100g || null,
      sodium: nutrients.sodium_100g || null,
    };

    res.json(result);
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch nutrition data" });
  }
});

module.exports = router;
