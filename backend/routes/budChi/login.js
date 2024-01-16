const User = require("../../models/budChi/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const salt1 = bcrypt.genSaltSync(10);

const secret = "hkdjhajklnajksdnanasmdasd";

const cookieParser = require("cookie-parser");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log("Username" + username);
    const isUser = await User.findOne({ username });

    if (isUser) {
      const passOK = bcrypt.compareSync(password, isUser.password);
      console.log(isUser);

      if (passOK) {
        jwt.sign(
          { username, id: isUser._id, currentbalance: isUser.currentbalance },
          secret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json({
              username,
              currentbalance: isUser.currentbalance,
              message: "Logged in successfully !",
            });
          }
        );
      } else {
        res.status(400).json("Username and password doesn't match !");
      }
    } else {
      res.status(401).json("User does not exists !");
    }
  } catch (error) {
    res.status(500).json("Failed to login due to Server Error !");
  }
};

module.exports = login;
