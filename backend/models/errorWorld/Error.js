const ErrorSchema = require("mongoose").Schema({
  title: String,
  description: String,
  code: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Error = require("mongoose").model("Errors", ErrorSchema);

module.exports = Error;
