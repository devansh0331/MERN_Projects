const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  currentbalance: {
    type: String,
    default: "0",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
