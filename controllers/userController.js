const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const userData = {
    email: user.email,
    following: user.following,
    listings: user.listings,
    ratings: user.ratings,
    username: user.username,
  };
  res.status(200).json({ status: "success", data: userData });
});

exports.getSimpleProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const userData = {
    ratings: user.ratings,
    username: user.username,
  };
  res.status(200).json({ status: "success", data: userData });
});

exports.followListing = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;
  const listingId = req.params.id;
  const user = await User.findByIdAndUpdate(
    userId,
    { $push: { following: listingId } },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ status: "success", data: { user } });
});

exports.followingListing = catchAsync(async (req, res, next) => {
  const listingId = req.params.id;
  console.log(listingId);
  const users = await User.find({ following: listingId });
  const followers = users.map((user) => {
    return {
      username: user.username,
      _id: user._id,
    };
  });
  res.status(200).json({ status: "following Listing ep", followers });
});
