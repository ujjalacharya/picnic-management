const Teacher = require("../models/Teacher");

exports.teacherById = async (req, res, next, id) => {
  const teacher = await Teacher.findById(id);
  if (teacher) {
    teacher.salt = undefined;
    teacher.hashed_password = undefined;
    req.profile = teacher;
    next();
  } else {
    res.status(400).json({ error: "Teacher not found!" });
  }
};
