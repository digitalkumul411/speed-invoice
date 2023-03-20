require("dotenv").config();
const jwt = require("jwt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// import models
const User = require("../models/User");

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if user email exists
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
  } catch (error) {
    console.error(error);
  }
};

// create user
const signup = async (req, res) => {
  try {
    res.status(200).json({ message: "user created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signin,
  signup,
};
