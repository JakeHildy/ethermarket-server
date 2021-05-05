const fs = require("fs");

function readCryptoPrices() {
  const fileContent = fs.readFileSync("./data/cryptoPrices.json");
  return JSON.parse(fileContent);
}

exports.getCrypto = async (req, res) => {
  try {
    symbol = req.query.symbol;
    const prices = readCryptoPrices();
    const requestedCoin = prices.find((coin) => coin.symbol === symbol);

    res.status(200).json({ status: "success", data: requestedCoin });
  } catch (err) {
    console.log(`💣 === ${err} === 💣`);
  }
};
