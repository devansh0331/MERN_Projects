const mongoose = require("mongoose");

const ExpensesSchema = mongoose.Schema({
  amount: String,
  description: String,
  deposit: {
    type: Boolean,
    default: false,
  },
  withdraw: {
    type: Boolean,
    default: false,
  },
  //   holder: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  holder: String,
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

const Expenses = mongoose.model("expeneses", ExpensesSchema);

module.exports = Expenses;
