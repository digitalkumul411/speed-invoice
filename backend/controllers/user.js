const User = require("../models/User");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendMail");

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

//forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // create reset token
    const bytes = crypto.randomBytes(32);
    const resetToken = bytes.toString("hex");

    // email message body
    const body = `
                    <p>You requested for password reset from Speed Invoicing application</p>
                    <h5>Please click this <a href="https://accountill.com/reset/${resetToken}">link</a> to reset your password</h5>
                    <p>Link not clickable?, copy and paste the following url in your address bar.</p>
                    <p>https://accountill.com/reset/${resetToken}</p>
                    <P>If this was a mistake, just ignore this email and nothing will happen.</P>
                    `;
    const subject = "PASSWORD RESET REQUEST";

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(422)
        .json({ status: "error", data: "Cannot find user" });

    user.resetToken = resetToken;
    user.expireToken = Date.now() + 3600000;

    const updateUser = await user.save();

    if (!updateUser)
      return res
        .status(400)
        .json({ status: "error", data: "Error updating user" });

    // send reset password link via email. nodemailer transport

    const userMessage = await sendMail(user.email, subject, body);

    if (!userMessage.success) {
      console.error("Error sending email");
      return res.status(422).json({
        status: "error",
        data: "Error sending email. Please try again later",
      });
    }

    //response
    res.status(201).json({ status: "success", data: "check your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "errror", data: error.message });
  }
};

// reset password
const resetPassword = async (req, res) => {
  try {
    const password = req.body.password;
    const resetToken = req.body.token;

    const user = await User.findOne({
      resetToken: resetToken,
      expireToken: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(422)
        .json({ status: "error", data: "Your session has expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.token = undefined;
    user.expireToken = undefined;

    await user.save();

    res
      .status(201)
      .json({ status: "success", data: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "errror", data: error.message });
  }
};

module.exports = {
  signin,
  signup,
  forgotPassword,
  resetPassword,
};
