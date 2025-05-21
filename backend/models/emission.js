const mongoose = require("mongoose");

const emissionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    carDistance: {
      type: Number,
      default: 0,
    },
    publicTransportDistance: {
      type: Number,
      default: 0,
    },
    vegMeals: {
      type: Number,
      default: 0,
    },
    nonVegMeals: {
      type: Number,
      default: 0,
    },
    acHours: {
      type: Number,
      default: 0,
    },
    cookingHours: {
      type: Number,
      default: 0,
    },
    renewableEnergy: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    totalCarbon: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Emission", emissionSchema);