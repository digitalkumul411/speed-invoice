const User = require("../models/User");
const Profile = require("../models/Profile");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const SECRET = process.env.JWT_SECRET;

// sign in to
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    const userProfile = await Profile.findOne({ userId: existingUser?._id });

    if (!userProfile) {
      return res
        .status(404)
        .json({ status: "error", message: "User does not exist" });
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ status: "error", data: "Invalid credentials" });
    }

    // create token for user if credientials are valid
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET,
      { expiresIn: "1h" }
    );

    // send token
    res.status(200).json({ data: existingUser, userProfile, token });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

// sign up
const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword, firstName, lastName, bio } =
      req.body;

    // if user exist
    const existingUser = await User.findOne({ email });
    const userProfile = await Profile.findOne({ userId: existingUser?._id });

    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", data: "User already exists" });
    }

    // if password does not match
    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ status: "error", data: "Password does not match" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      bio,
    });

    if (!newUser) {
      return res
        .status(400)
        .json({ status: "error", data: "Error creating user" });
    }

    // create token
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ newUser, userProfile, token });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

module.exports = {
  signin,
  signup,
};
