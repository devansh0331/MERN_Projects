const Error = require("../../models/errorWorld/Error");

const singleError = async (req, res) => {
  const { id } = req.params;

  //   console.log(id);

  try {
    const isError = await Error.findOne({ _id: id });

    if (isError) {
      res.status(200).json(isError);
    } else {
      res.status(400).json("Error not found");
    }
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

module.exports = singleError;
