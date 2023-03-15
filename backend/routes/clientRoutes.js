const router = require("express").Router();
const {
  getClients,
  getClient,
  removeClient,
  updateClient,
} = require("../controllers/clients");

router.route("/clients").get(getClients);
router
  .route("/clients/:id")
  .get(getClient)
  .patch(updateClient)
  .delete(removeClient);

module.exports = router;
