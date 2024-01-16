const logout = (req, res) => {
  res.cookie("token", "").json("ok");
};

module.exports = logout;
