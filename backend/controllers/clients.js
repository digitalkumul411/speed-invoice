// get clients list
const getClients = (req, res) => {
  res.status(200).json({ data: "clients" });
};

module.exports = {
  getClients,
};
