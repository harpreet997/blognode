const nodeMailer = require("nodemailer");

var transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

module.exports = transporter;
