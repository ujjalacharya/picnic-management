const express = require("express");
const router = express.Router();
const { signup, signin, requireSignin } = require("../controllers/teacher");
const { teacherSignupValidator } = require("../validator");

router.post("/signup", teacherSignupValidator, signup);
router.post("/signin", signin);

router.get('/secret', requireSignin, (req, res) => {
 res.json("This is secret...sshhh")
})

module.exports = router;
