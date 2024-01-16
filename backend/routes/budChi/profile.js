const jwt = require("jsonwebtoken");

const secret = "hkdjhajklnajksdnanasmdasd";

const profile = (req, res) => {
  const { token } = req.cookies;

  try {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.status(200).json(info);
    });
    res.json(req.cookies);
  } catch (error) {
    res.status(500).json("Cannot load profile");
  }
};

module.exports = profile;
