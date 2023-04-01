const router = require("express").Router();
const {
  getClients,
  getClient,
  removeClient,
  updateClient,
  createClient,
} = require("../controllers/clients");

router.route("/clients").get(getClients).post(createClient);
router
  .route("/clients/:id")
  .get(getClient)
  .patch(updateClient)
  .delete(removeClient);

module.exports = router;
