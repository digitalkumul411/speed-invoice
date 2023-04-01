
const router = require("express").Router();
const {
  signin,
  signup,
  forgotPassword,
  resetPassword,
} = require("../controllers/user");

router.route("/user/signin").post(signin);
router.route("/user/signup").post(signup);
router.route("/user/forgotpassword").post(forgotPassword);
router.route("/user/reset").post(resetPassword);


module.exports = router;
