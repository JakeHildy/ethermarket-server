const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  listingId: {
    type: String,
    required: [true, "A Conversation must a listingId"],
  },
  creatorUsername: {
    type: String,
    required: [true, "A Conversation must a Creator username"],
  },
  followerUsername: {
    type: String,
    required: [true, "A Conversation must a Follower username"],
  },
  conversationHistory: [
    {
      senderId: { type: String, required: [true, "A Message must a senderId"] },
      message: {
        type: String,
        required: [true, "A Message must have some text"],
      },
      timestamp: { type: Date, default: Date.now() },
      read: { type: Boolean, default: false },
    },
  ],
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
