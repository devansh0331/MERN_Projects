const Expenses = require("../../models/budChi/Expenses");

const postExpense = async (req, res) => {
  const { amount, deposit, withdraw, holder, description } = req.body;

  try {
    const newExpenese = await Expenses.create({
      amount,
      deposit,
      withdraw,
      holder,
      description,
      postedAt: Date.now(),
    });

    if (newExpenese) {
      res.status(200).json("Expense Added !");
    } else {
      res.status(400).json("Failed to add expense !");
    }
  } catch (error) {
    res.status(500).json("Server Error !");
  }
};

module.exports = postExpense;
