const Crypto = require("../models/crypto.model");

const getCryptoStats = async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: "Coin is required" });

  const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
  if (!latestData) return res.status(404).json({ error: "Data not found" });

  res.json({
    price: latestData.price,
    marketCap: latestData.marketCap,
    "24hChange": latestData.change24h,
  });
};

module.exports = { getCryptoStats };
