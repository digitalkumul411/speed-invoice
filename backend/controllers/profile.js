// get Profiles list
const getProfiles = (req, res) => {
  res.status(200).json({ data: "Profiles" });
};

module.exports = {
  getProfiles,
};
