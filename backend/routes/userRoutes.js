const router = require("express").Router();
const { signin, signup } = require("../controllers/user");

router.route("/user/signin").post(signin);
router.route("/user/signup").post(signup);

module.exports = router;
