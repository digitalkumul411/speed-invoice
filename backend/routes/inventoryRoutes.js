const router = require("express").Router();
const { getInventory } = require("../controllers/inventory");

router.route("/inventory").get(getInventory);

module.exports = router;
