// get Inventory list
const getInventory = (req, res) => {
  res.status(200).json({ data: "Inventory" });
};

module.exports = {
  getInventory,
};
