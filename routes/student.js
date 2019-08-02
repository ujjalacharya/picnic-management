const express = require("express");

const { requireSignin } = require("../controllers/auth");

const {
  getAllStudents,
  createStudent,
  studentById,
  deleteStudentById,
  getStudentById,
  photo,
  updateStudentById
} = require("../controllers/student");

const router = express.Router();

router
  .route("/")
  .get(requireSignin, getAllStudents)
  .post(requireSignin, createStudent);

// photo
router.get("/photo/:studentId", photo);

router
  .route("/:studentId")
  .get(requireSignin, getStudentById)
  .put(requireSignin, updateStudentById)
  .delete(requireSignin, deleteStudentById);

// any route containing :postId, our app will first execute postByID()
router.param("studentId", studentById);

module.exports = router;
