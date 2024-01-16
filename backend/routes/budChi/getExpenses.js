const Expenses = require("../../models/budChi/Expenses");

const getExpenses = async (req, res) => {
  const { id } = req.params;
  try {
    const expenses = await Expenses.find({ holder: id });
    if (expenses) {
      res.status(200).json(expenses);
    } else {
      res.status(400).json("No expenses found !");
    }
  } catch (error) {
    res.status(500).json("Failed to load the expenses !");
  }
};

module.exports = getExpenses;
