const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Please tell us your name!"] },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
  },
  ratings: [String],
  listings: [String],
  following: [String],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
