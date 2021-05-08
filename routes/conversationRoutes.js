const express = require("express");
const conversationController = require("../controllers/conversationController");

const router = express.Router();

router.route("/").get(conversationController.getAllConversations);

module.exports = router;
