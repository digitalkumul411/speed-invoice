const router = require("express").Router();
const { getInvoices } = require("../controllers/invoices");

router.route("/invoice").get(getInvoices);

module.exports = router;
