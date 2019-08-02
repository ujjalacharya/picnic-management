const router = require("express").Router();
const { requireSignin } = require("../controllers/auth");
const { teacherById } = require("../controllers/teacher");

router.get("/secret/:teacherId", requireSignin, (req, res) => {
  res.json({ auth: req.auth, profile: req.profile });
});

router.param("teacherId", teacherById);

module.exports = router;