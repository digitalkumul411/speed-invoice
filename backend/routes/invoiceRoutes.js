const router = require("express").Router();
const {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  removeInvoice,
} = require("../controllers/invoices");

router.route("/invoice").get(getInvoices).post(createInvoice);
router
  .route("/invoice/:id")
  .get(getInvoice)
  .patch(updateInvoice)
  .delete(removeInvoice);

module.exports = router;
