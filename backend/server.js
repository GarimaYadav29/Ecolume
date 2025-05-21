const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const barcodeRoutes = require("./routes/barcodeRoutes");
const emissionRoutes = require("./routes/emissionRoutes");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/ecolume", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Ecolume Backend!");
});

app.use("/api", barcodeRoutes);

app.use("/api/emissions", emissionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://192.168.1.43:${PORT}`);
});