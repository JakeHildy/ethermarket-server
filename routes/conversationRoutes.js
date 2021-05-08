const express = require("express");
const conversationController = require("../controllers/conversationController");

const router = express.Router();

router
  .route("/:id")
  .post(conversationController.postMessage)
  .get(conversationController.getConversation);

router
  .route("/")
  .get(conversationController.getAllConversations)
  .post(conversationController.createConversation);

module.exports = router;
