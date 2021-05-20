const Listing = require("./../models/listingModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");

exports.aliasRecentSix = (req, _res, next) => {
  req.query.limit = "6";
  req.query.sort = "createdAt";
  req.query.fields = "createdAt,title,price,images";
  next();
};

exports.getAllListings = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Listing.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const listings = await features.query;

  // SEND RESONSE
  res.status(200).json({
    status: "success",
    results: listings.length,
    data: { listings },
  });
});

exports.createListing = catchAsync(async (req, res, next) => {
  const newListing = await Listing.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      listing: newListing,
    },
  });
});

exports.getListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  res.status(200).json({ status: "success", data: { listing } });
});

exports.updateListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ status: "success", data: { listing } });
});

exports.deleteListing = catchAsync(async (req, res, next) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.status(204).json({ status: "success", data: null });
});

// USING AGGREGATION PIPELINE
exports.getListingStats = catchAsync(async (req, res, next) => {
  const stats = await Listing.aggregate([
    // {
    //   $match: { price: { $lte: 25 } },
    // },
    {
      $group: {
        _id: "$listCurrency",
        numListings: { $sum: 1 },
        totalListingValue: { $sum: "$price" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: -1 },
    },
    // EG: filter out BTC:
    // {
    //   $match: { _id: { $ne: "BTC" } },
    // },
  ]);
  res.status(200).json({ status: "success", stats });
});

exports.getListingsByMonth = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Listing.aggregate([
    {
      $unwind: "$createdAt",
    },
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        numListings: { $sum: 1 },
        listings: { $push: "$title" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numListings: -1 },
    },
    // {
    //   limit: 12,
    // },
  ]);

  res.status(200).json({ status: "success", plan });
});
