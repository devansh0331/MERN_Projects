const { parse } = require("dotenv");
const User = require("../../models/budChi/User");

const updateBalance = async (req, res) => {
  const { username, amount, deposit, withdraw } = req.body;

  console.log("Deposit: " + deposit + " Withdraw: " + withdraw);

  try {
    const getUser = await User.findOne({ username });
    var newbalance = 0;
    if (getUser) {
      if (deposit) {
        newbalance = parseInt(amount) + parseInt(getUser.currentbalance);
      }

      if (withdraw) {
        if (parseInt(amount) > parseInt(getUser.currentbalance)) {
          res.status(401).json("Don't have sufficient amount !");
        } else {
          newbalance = parseInt(getUser.currentbalance) - parseInt(amount);
        }
      }

      const updateUser = await User.updateOne(
        { username },
        {
          currentbalance: `${newbalance}`,
        }
      );

      if (updateUser) {
        res
          .status(200)
          .json(`Amount Updated : Your current balance is Rs. ${newbalance}`);
      } else {
        res.status(400).json(`Failed to update`);
      }
    } else {
      res.status(400).json(`Failed to update`);
    }
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

module.exports = updateBalance;
