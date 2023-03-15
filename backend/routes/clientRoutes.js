const router = require("express").Router();
const { getClients } = require("../controllers/clients");

router.route("/clients").get(getClients);

module.exports = router;
