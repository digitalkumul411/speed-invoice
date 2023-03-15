// get clients list
const getClients = (req, res) => {
  res.status(200).json({ data: "clients" });
};

// get single client
const getClient = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({ status: "success", data: `get client ${id}` });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

//update client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({ status: "success", data: `update client${id}` });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

// delete client
const removeClient = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({ status: "success", data: `remove client${id}` });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

module.exports = {
  getClients,
  getClient,
  removeClient,
  updateClient,
};
