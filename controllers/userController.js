const User = require("./../models/userModel");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userData = {
      email: user.email,
      following: user.following,
      listings: user.listings,
      ratings: user.ratings,
      username: user.username,
    };
    res.status(200).json({ status: "success", data: userData });
  } catch (err) {
    res.status(404).json({ status: "fail", message: "User not found" });
  }
};
