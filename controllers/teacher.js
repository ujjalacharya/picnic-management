const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  console.log(req.body);
  const teacher = new Teacher(req.body);
  const savedteacher = await teacher.save();

  teacher.salt = undefined;
  teacher.hashed_password = undefined;
  res.json(savedteacher);
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const teacher = await Teacher.findOne({ email });

  if (!teacher) {
    return res.status(401).json({
      error: "Teacher with that email does not exist."
    });
  }

  if (!teacher.authenticate(password)) {
    return res.status(401).json({
      error: "Email and password do not match"
    });
  }

  const payload = {
    id: teacher.id
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET
    // {expiresIn:"1h"}
  );

  const { _id, email: mail, firstname } = teacher;
  return res.json({ token, teacher: { _id, mail, firstname } });
};
