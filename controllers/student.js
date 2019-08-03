const Student = require("../models/Student");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.studentById = async (req, res, next, id) => {
 const student = await Student.findById(id)
 if (!student) {
   return res.status(400).json({
     error: "student not found"
   });
 }
//  student.profile_pic = undefined;
 req.student = student; // adds student object in req with student info
 next();
};

exports.getAllStudents = async (req, res) => {
  const students = await Student.find().select("name grade email");
  if (students) {
    res.json(students);
  } else {
    res.status(400).json({ error: "No students found!" });
  }
};

exports.createStudent = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.maxFileSize = 1 * 1024 * 1024;
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
    result.profile_pic = undefined;
    res.json(result);
  });
};

exports.getStudentById = async (req, res) => {
  res.json(req.student);
};

exports.updateStudentById = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.maxFileSize = 1 * 1024 * 1024;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      });
    }
    // save student
    let student = req.student;
    student = _.extend(student, fields);
    student.updated = Date.now();

    if (files.profile_pic) {
      student.profile_pic.data = fs.readFileSync(files.profile_pic.path);
      student.profile_pic.contentType = files.profile_pic.type;
    }

    const result = await student.save().catch(err => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });

    result.profile_pic = undefined;
    res.json(result);
  });
};

exports.deleteStudentById = async (req, res) => {
  let student = req.student;
  await student.remove();
  res.json({ message: "student deleted successfully" });
};

exports.photo = (req, res, next) => {
  res.set("Content-Type", req.student.profile_pic.contentType);
  console.log(req.student)
  return res.send(req.student.profile_pic.data);
};
