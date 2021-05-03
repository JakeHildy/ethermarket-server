const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ status: "working", data: { user: newUser } });
  } catch (err) {
    res.status(400).json({ message: "failed", err });
  }
};
