const fs = require("fs");
const catchAsync = require("./../utils/catchAsync");

function readCryptoPrices() {
  const fileContent = fs.readFileSync("./data/cryptoPrices.json");
  return JSON.parse(fileContent);
}

exports.getCrypto = catchAsync(async (req, res, next) => {
  symbol = req.query.symbol;
  const prices = readCryptoPrices();
  const requestedCoin = prices.find((coin) => coin.symbol === symbol);
  res.status(200).json({ status: "success", data: requestedCoin });
});
