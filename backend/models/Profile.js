const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  businessName: {
    type: String,
  },
  contactAddress: {
    type: String,
  },
  paymentDetails: {
    type: String,
  },
  logo: {
    type: String,
  },
  website: {
    type: String,
  },
  userId: [String],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
