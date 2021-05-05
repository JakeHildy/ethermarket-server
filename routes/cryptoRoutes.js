const express = require("express");
const router = express.Router();
const apiCryptoController = require("../controllers/cryptoController");

router.route("/").get(apiCryptoController.getCrypto);

module.exports = router;
