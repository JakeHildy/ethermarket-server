const express = require("express");
const conversationController = require("../controllers/conversationController");

const router = express.Router();

router.route("/post/:id").post(conversationController.postMessage);

router.route("/single").get(conversationController.getAllConversations);

router.route("/:id").get(conversationController.getConversation);

router
  .route("/")
  .get(conversationController.getAllConversations)
  .post(conversationController.createConversation);

module.exports = router;
