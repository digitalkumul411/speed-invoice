const Profile = require("../models/Profile");
const mongoose = require("mongoose");

// get Profiles list
const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({});

    if (!profiles) {
      return res
        .status(404)
        .json({ status: "error", data: "No profiles found" });
    }

    res.status(200).json({ status: "success", data: profiles });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

// get single profile
const getProfile = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(400).json({ status: "error", data: "Not a valid id" });

    const profile = await Profile.findById(_id);

    if (!profile)
      return res
        .status(404)
        .json({ status: "error", data: "Cannot find profile" });

    res.status(200).json({ status: "success", data: profile });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

// update profile
const updateProfile = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const profile = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ status: "error", data: "Not a valid id" });
    }

    //
    const updatedProfile = await Profile.findByIdAndUpdate(_id, { ...profile });

    if (!updatedProfile) {
      return res
        .status(400)
        .json({ status: "error", data: "Error updating profile" });
    }

    res.status(200).json({ status: "success", data: updatedProfile });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

// delete profile
const removeProfile = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ status: "error", data: "Not a valid id" });
    }

    const dropProfile = await Profile.findOneAndDelete({ _id });

    if (!dropProfile) {
      return res
        .status(400)
        .json({ status: "error", data: "Error removing profile" });
    }

    res.status(200).json({ status: "success", data: dropProfile });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

// create profile
const createProfile = async (req, res) => {
  try {
    const profile = req.body;

    const newProfile = await Profile.create({ ...profile });

    if (!newProfile)
      return res
        .status(400)
        .json({ status: "error", data: "Error creating profile" });

    res.status(200).json({ status: "success", data: newProfile });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

module.exports = {
  getProfiles,
  getProfile,
  updateProfile,
  removeProfile,
  createProfile,
};
