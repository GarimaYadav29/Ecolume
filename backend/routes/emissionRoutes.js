const express = require("express");
const router = express.Router();

// Assuming you have a model for emissions
const Emission = require("../models/emission");

router.post("/", async (req, res) => {
  try {
    const emissionData = new Emission({
      date: req.body.date,
      carDistance: req.body.carDistance,
      publicTransportDistance: req.body.publicTransportDistance,
      vegMeals: req.body.vegMeals,
      nonVegMeals: req.body.nonVegMeals,
      acHours: req.body.acHours,
      cookingHours: req.body.cookingHours,
      renewableEnergy: req.body.renewableEnergy,
      totalCarbon: req.body.totalCarbon,
    });
    await emissionData.save();
    res.status(200).json({ message: "Emissions data saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save emissions data." });
  }
});

router.get("/", async (req, res) => {
  try {
    const emissions = await Emission.find().sort({ date: -1 }); // latest first
    res.status(200).json(emissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch emissions data." });
  }
});

module.exports = router;
