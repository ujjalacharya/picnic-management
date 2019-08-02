const Teacher = require("../models/Teacher");

exports.signup = async (req, res) => {
  console.log(req.body);
  const teacher = new Teacher(req.body);
  const savedteacher = await teacher.save();
  res.json(savedteacher);
};