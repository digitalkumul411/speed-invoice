// get invoices list
const getInvoices = (req, res) => {
  res.status(200).json({ data: "invoices" });
};

module.exports = {
  getInvoices,
};
