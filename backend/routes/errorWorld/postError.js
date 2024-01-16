const Error = require("../../models/errorWorld/Error");

const postError = async (req, res) => {
  const { title, description, code } = req.body;

  // EXAMPLE FOR TEST DATA

  //  // const title = "New Test error";
  //  // const description = "New test description";
  //  // const code = "something solution";

  try {
    const newError = await Error.create({
      title,
      description,
      code,
      createdAt: Date.now(),
    });

    if (newError) {
      res.status(200).json("Error submitted successfully");
    } else {
      res.status(400).json("Error failed to submit");
    }
  } catch (error) {
    res.status(500).json("Error failed to submit");
  }
};
module.exports = postError;
