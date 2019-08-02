const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/auth");
const { teacherSignupValidator } = require("../validator");

router.post("/signup", teacherSignupValidator, signup);
router.post("/signin", signin);

module.exports = router;
