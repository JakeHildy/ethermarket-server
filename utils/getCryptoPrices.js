const REFRESH_MS = 300000; // 5 mins
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const axios = require("axios");
const fs = require("fs");

exports.getCryptoPrices = () => {
  const CRYPTO_KEY = process.env.CRYPTO_API_KEY;
  setInterval(async () => {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${CRYPTO_KEY}`
    );
    const data = response.data.data;
    fs.writeFileSync("./data/cryptoPrices.json", JSON.stringify(data));
    console.log(`Crypto Prices Updated: ${Date.now()}`);
  }, REFRESH_MS);
};
