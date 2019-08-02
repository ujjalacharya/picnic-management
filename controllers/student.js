const Student = require("../models/Student");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.getAllStudents = async (req, res) => {
  const students = await Student.find();
  if (students) {
    res.json(students);
  } else {
    res.status(400).json({ error: "No students found!" });
  }
};

exports.createStudent = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }

    let student = new Student(fields);

    if (files.profile_pic) {
      student.profile_pic.data = fs.readFileSync(files.profile_pic.path);
      student.profile_pic.contentType = files.profile_pic.type;
    }
    const result = await student.save().catch(err => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
    res.json(result);
  });
};
