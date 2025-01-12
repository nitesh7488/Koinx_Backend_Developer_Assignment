require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { fetchAndStoreCryptoData } = require("./jobs/fetchPrices.job");

// Run the background job once at startup
(async () => {
  try {
    await fetchAndStoreCryptoData();
  } catch (error) {
    console.error("Error running the fetch job at startup:", error);
  }
})();

const app = express();
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection
mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Routes
const statsRoutes = require("./routes/stats.route");
const deviationRoutes = require("./routes/deviation.route");

app.use("/stats", statsRoutes);
app.use("/deviation", deviationRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

