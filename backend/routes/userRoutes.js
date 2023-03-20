const { signin, signup } = require("../controllers/users");

const router = require("express").Router();

router.route("/").post(signin);
router.route("/signup").post(signup);

module.exports = router;
