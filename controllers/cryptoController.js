const axios = require("axios");

const API_KEY = process.env.CRYPTO_API_KEY;

exports.getCrypto = async (req, res) => {
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=ff6e1bc8-ee55-4cba-8a16-6983c2a9cb4a`
    );
    const data = response.data.data;
    symbol = req.query.symbol;
    const requestedCoin = data.find((coin) => coin.symbol === symbol);

    res.status(200).json({ status: "success", data: requestedCoin });
  } catch (err) {
    console.log(`💣 === ${err} === 💣`);
  }
};
