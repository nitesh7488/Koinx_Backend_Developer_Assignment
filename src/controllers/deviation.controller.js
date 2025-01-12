const Crypto = require("../models/crypto.model");

const getPriceDeviation = async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: "Coin is required" });

  const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
  if (!records.length) return res.status(404).json({ error: "Data not found" });

  const prices = records.map((record) => record.price);
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
  const deviation = Math.sqrt(variance);

  res.json({ deviation: deviation.toFixed(2) });
};

module.exports = { getPriceDeviation };
