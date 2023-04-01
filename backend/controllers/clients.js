const Client = require("../models/Client");
const mongoose = require("mongoose");

// get clients list
const getClients = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    // get starting index of every page
    const startIndex = (Number(page) - 1) * LIMIT;

    //
    const total = await Client.countDocuments({});
    const clients = await Client.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    // response
    res.status(200).json({
      data: clients,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });

    // res.status(200).json({ data: "clients" });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

// get single client
const getClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({ status: "error", data: "404 not found." });
    }
    res.status(200).json({ status: "success", data: client });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

//update client
const updateClient = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { client } = req.body;

    // check id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No client with that id");
    }

    const updatedClient = await Client.findByIdAndUpdate(
      _id,
      { ...client, _id },
      { new: true }
    );

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

// delete client
const removeClient = async (req, res) => {
  try {
    const { id: _id } = req.params;

    // check id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No client with that id");
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

// create client
const createClient = async (req, res) => {
  try {
    const client = req.body;

    const newClient = await Client.create({ ...client });

    if (!newClient) {
      return res
        .status(400)
        .json({ status: "error", data: "Error creating client" });
    }

    res.status(200).json({ status: "success", data: newClient });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

module.exports = {
  getClients,
  getClient,
  removeClient,
  updateClient,
  createClient,
};
