const express = require("express");

const { requireSignin } = require("../controllers/auth");

const { getAllStudents, createStudent } = require("../controllers/student");

const router = express.Router();

router.route("/")
      .get(requireSignin, getAllStudents)
      .post(requireSignin, createStudent)

module.exports = router;
