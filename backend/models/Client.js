const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  userId: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
