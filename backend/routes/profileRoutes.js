const router = require("express").Router();
const { getProfiles } = require("../controllers/profile");

router.route("/profile").get(getProfiles);

module.exports = router;
