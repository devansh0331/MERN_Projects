const User = require("../../models/budChi/User");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const salt1 = bcrypt.genSaltSync(10);

const secret = "hkdjhajklnajksdnanasmdasd";

const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const isPrevUser = await User.findOne({ username });

    if (isPrevUser) {
      res.status(401).json("Username already exists !");
    } else {
      const newUser = await User.create({
        name,
        username,
        email,
        password: bcrypt.hashSync(password, salt1),
        createdAt: Date.now(),
      });
      if (newUser) {
        res
          .status(200)
          .json({ data: newUser, message: "User created sucesfully !" });
      } else {
        res.status(400).json("Failed to create new user !");
      }
    }
  } catch (err) {
    res.status(500).json("Server Error !");
  }
};

module.exports = signup;
