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

exports.getSimpleProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userData = {
      ratings: user.ratings,
      username: user.username,
    };
    res.status(200).json({ status: "success", data: userData });
  } catch (err) {
    res.status(404).json({ status: "fail", message: "User not found" });
  }
};

exports.followListing = async (req, res) => {
  const userId = req.body.userId;
  const listingId = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { following: listingId } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};

exports.followingListing = async (req, res) => {
  const listingId = req.params.id;
  try {
    console.log(listingId);
    const users = await User.find({ following: listingId });
    const followers = users.map((user) => {
      return {
        username: user.username,
        _id: user._id,
      };
    });
    res.status(200).json({ status: "following Listing ep", followers });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};
