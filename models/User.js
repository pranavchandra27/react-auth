const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },

  email: {
    type: String,
    trim: true,
    required: true,
    unique: [true, "Email already exist"],
  },

  role: {
    type: String,
    trim: true,
    default: "public",
    enum: ["admin", "public"],
  },

  password: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
