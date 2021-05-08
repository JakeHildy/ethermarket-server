const APIFeatures = require("./../utils/apiFeatures");

exports.getAllConversations = async (req, res) => {
  try {
    // SEND RESONSE
    res.status(200).json({
      status: "success",
      data: "get all conversations EP",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};
