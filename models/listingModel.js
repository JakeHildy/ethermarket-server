const mongoose = require("mongoose");
const slugify = require("slugify");

const listingSchema = new mongoose.Schema(
  {
    creatorId: { type: String, required: [true, "A listing must a creatorId"] },
    posted: { type: Boolean, default: false },
    sold: { type: Boolean, default: false },
    title: { type: String, required: [true, "A listing must have a title"] },
    slug: String,
    price: {
      type: Number,
      required: [true, "A listing must have a list price"],
    },
    listCurrency: { type: String, default: "ETH" },
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

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
