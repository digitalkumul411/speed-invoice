const nodemailer = require("nodemailer");

const HOST = process.env.SMTP_HOST;
const PORT = process.env.SMTP_PORT;
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASS;

const sendMail = async (userEmail, subject, html) => {
  try {
    // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
    const transporter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      auth: {
        user: USER,
        pass: PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail
    transporter.sendMail({
      to: userEmail,
      from: "Accountill <hello@accountill.com>",
      subject: subject,
      html: html,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = sendMail;
