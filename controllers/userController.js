const User = require("./../models/userModel");

exports.getProfile = async (req, res) => {
  res.status(503).json({ message: "get Profile endpoint" });
};
