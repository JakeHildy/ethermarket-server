const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user Found with that ID", 404));
  }

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

  if (!user) {
    return next(new AppError("No user Found with that ID", 404));
  }

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

  if (!user) {
    return next(new AppError("No user Found with that ID", 404));
  }

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
