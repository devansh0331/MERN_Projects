const Error = require("../../models/errorWorld/Error");

const getErrors = async (req, res) => {
  try {
    const errorList = await Error.find();

    if (errorList.length != 0) {
      res.json(errorList).status(500);
    } else {
      res.json("No Error Found").status(400);
    }
  } catch (error) {
    res.json("Server Error").status(500);
  }
};

module.exports = getErrors;
