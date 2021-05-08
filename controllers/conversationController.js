const APIFeatures = require("./../utils/apiFeatures");
const Conversation = require("./../models/conversationModel");

exports.createConversation = async (req, res) => {
  try {
    const newConversation = await Conversation.create(req.body);
    res.status(200).json({ status: "Success", message: newConversation });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.status(200).json({
      status: "success",
      data: conversations,
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({ _id: req.params.id });
    res.status(200).json({ status: "Success", conversation });
  } catch (err) {
    res.status(404).json({ status: "fail", data: err });
  }
};

exports.postMessage = async (req, res) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { conversationHistory: req.body } }
    );
    res.status(200).json({ status: "Success", updatedConversation });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
