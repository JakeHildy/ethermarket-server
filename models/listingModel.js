const mongoose = require("mongoose");
const slugify = require("slugify");
// const validator = require("validator");

const listingSchema = new mongoose.Schema(
  {
    creatorId: { type: String, required: [true, "A listing must a creatorId"] },
    posted: { type: Boolean, default: false },
    sold: { type: Boolean, default: false },
    title: {
      type: String,
      required: [true, "A listing must have a title"],
      maxlength: [
        50,
        "A listing name must have less than or equal to 50 characters!",
      ],
      minlength: [2, "A listing name must have more than one character!"],
    },
    slug: String,
    price: {
      type: Number,
      required: [true, "A listing must have a list price"],
    },
    listCurrency: {
      type: String,
      default: "ETH" /*to validate: enum: ["ETH", "BTC"]*/,
    },
    category: {
      type: String,
      required: [true, "A listing must have a category"],
    },
    condition: { type: String, default: "Not Specified" },
    location: { lat: String, long: String },
    description: {
      type: String,
      required: [true, "A listing must have a description"],
    },
    images: [String],
    createdAt: { type: Date, default: Date.now() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

listingSchema.virtual("listingAge").get(function () {
  return Date.now() - this.createdAt;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
listingSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// listingSchema.pre("save", function (next) {
//   console.log("Will save document...");
//   next();
// });

// listingSchema.post("save", function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// any queries that start with "find". ie findOne find etc.
// listingSchema.pre("find", function (next) {
listingSchema.pre(/^find/, function (next) {
  this.find({ posted: true });
  this.start = Date.now();
  next();
});

listingSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  // console.log(docs);
  next();
});

// AGGREGATION MIDDLEWARE
listingSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { posted: true } });
  // console.log(this.pipeline());
  next();
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
