const router = require("express").Router();

const {
  getProfiles,
  getProfile,
  updateProfile,
  removeProfile,
  createProfile,
} = require("../controllers/profile");

router.route("/profile").get(getProfiles).post(createProfile);
router
  .route("/profile/:id")
  .get(getProfile)
  .patch(updateProfile)
  .delete(removeProfile);

module.exports = router;
