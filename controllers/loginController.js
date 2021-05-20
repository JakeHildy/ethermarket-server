const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const users = await User.find({ username });
  if (users.length !== 1) throw Error();
  const user = users[0];
  if (user.password !== password) throw Error();

  // User Authenticated:
  let token = jwt.sign({ username: user.username }, process.env.JWT_KEY);
  res.status(200).json({ token, id: user._id, username: user.username });
});
