const APIFeatures = require("./../utils/apiFeatures");
const Conversation = require("./../models/conversationModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createConversation = catchAsync(async (req, res, next) => {
  const newConversation = await Conversation.create(req.body);
  res.status(201).json({ status: "Success", message: newConversation });
});

exports.getAllConversations = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Conversation.find(), req.query).filter();
  const conversations = await features.query;

  if (conversations.length === 0)
    return res
      .status(200)
      .json({ status: "fail", message: "no conversation created" });
  res.status(200).json({
    status: "success",
    message: "conversation found",
    data: conversations,
  });
});

exports.getConversation = catchAsync(async (req, res, next) => {
  const conversation = await Conversation.findById(req.params.id);

  if (!conversation) {
    return next(new AppError("No Conversation with that ID", 404));
  }
  res.status(200).json({ status: "Success", conversation });
});

exports.postMessage = catchAsync(async (req, res, next) => {
  const updatedConversation = await Conversation.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { conversationHistory: req.body } }
  );
  res.status(200).json({ status: "Success", updatedConversation });
});
