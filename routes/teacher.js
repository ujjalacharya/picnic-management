const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/teacher");
const { teacherSignupValidator } = require("../validator");

router.post("/signup", teacherSignupValidator, signup);

module.exports = router;
