const Invoice = require("../models/Invoice");
const mongoose = require("mongoose");

// get invoices list
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({});

    if (!invoices) {
      return res
        .status(400)
        .json({ status: "error", data: "Error getting invoices" });
    }

    res.status(200).json({ status: "success", data: invoices });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

// get invoice
const getInvoice = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(400).json({ status: "error", data: "Not a valid id" });

    const invoice = await Invoice.findById(_id);

    if (!invoice) {
      return res
        .status(404)
        .json({ status: "error", data: "Cannot find invoice" });
    }

    res.status(200).json({ status: "success", data: invoice });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

// create invoice
const createInvoice = async (req, res) => {
  try {
    const invoice = req.body;

    const newInvoice = await Invoice.create({ ...invoice });

    if (!newInvoice) {
      res.status(400).json({ status: "error", data: "Error creating invoice" });
    }

    res.status(201).json({ status: "success", data: newInvoice });
  } catch (error) {
    res.status(200).json({ status: "error", data: error.message });
  }
};

// update invoice
const updateInvoice = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const invoice = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res
        .status(404)
        .json({ status: "error", data: "No invoice with that id" });

    const updatedInvoice = await Invoice.findByIdAndUpdate(_id, {
      ...invoice,
      _id,
    });

    if (!updatedInvoice) {
      return res
        .status(400)
        .json({ status: "error", data: "Error updating invoice" });
    }

    res.status(201).json({ status: "success", data: updatedInvoice });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

// remove invoice
const removeInvoice = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const invoice = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res
        .status(404)
        .json({ status: "error", data: "No invoice with that id" });

    const deletedInvoice = await Invoice.findByIdAndDelete(_id);

    if (!deletedInvoice) {
      return res
        .status(400)
        .json({ status: "error", data: "Error deleting invoice" });
    }

    res.status(200).json({ status: "success", data: deletedInvoice });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

module.exports = {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  removeInvoice,
};
