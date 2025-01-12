const cron = require("node-cron");
const { fetchCryptoData } = require("../services/coinGecko.service");
const Crypto = require("../models/crypto.model");

const coins = ["bitcoin", "matic-network", "ethereum"];

const fetchAndStoreCryptoData = async () => {
  console.log("Running background job to fetch crypto data...");
  const data = await fetchCryptoData(coins);
  if (!data) return;

  for (const coin of coins) {
    const coinData = data[coin];
    if (coinData) {
      await Crypto.create({
        coin,
        price: coinData.usd,
        marketCap: coinData.usd_market_cap,
        change24h: coinData.usd_24h_change,
      });
    }
  }
};

// Schedule the job to run every 2 hours
cron.schedule("0 */2 * * *", fetchAndStoreCryptoData);

module.exports = { fetchAndStoreCryptoData };
