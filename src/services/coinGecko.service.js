const axios = require("axios");

const BASE_URL = "https://api.coingecko.com/api/v3/simple/price";

const fetchCryptoData = async (coins) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        ids: coins.join(","),
        vs_currencies: "usd",
        include_market_cap: true,
        include_24hr_change: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error);
    return null;
  }
};

module.exports = { fetchCryptoData };
