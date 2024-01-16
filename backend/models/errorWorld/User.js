// const mongoose = require("mongoose");

const UserSchema = require("mongoose").Schema({
  name: String,
  email: String,
  username: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const User = require("mongoose").model("Users", UserSchema);

module.exports = User;
