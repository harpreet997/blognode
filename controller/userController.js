const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { unlinkSync } = require("fs");
const user = require("../model/userSchema");
const userSchema = require("../model/userSchema");
const transporter = require("../service/emailService");

module.exports = {
  registerUser: async (req, res) => {
    try {
      let new_user = userSchema(req.body);
      let userExists = await user.findOne({ userEmail: req.body.userEmail });
      if (userExists) {
        req.file ? unlinkSync(req.file.path) : null; //Delete multer unnecessary uploaded photo
        return res.status(409).json({
          success: false,
          status: "failure",
          message: "Email already register",
        });
      }

      const salt = await bcrypt.genSalt(10);
      new_user.password = await bcrypt.hash(req.body.password, salt);
      const filePath = `/uploads/${req.file.filename}`;
      new_user.profilePic = filePath;
      let data = await new_user.save();
      res.status(201).json({
        success: true,
        message: "User created succesfully",
        res: data,
      });
    } catch (err) {
      res.json({
        success: false,
        message: "Error occure",
        error: err.message,
      });
    }
  },

  userLogin: async (req, res) => {
    try {
      const { userEmail, password } = req.body;
      const userExists = await user.findOne({ userEmail: req.body.userEmail });
      if (userExists != null) {
        const isMatch = await bcrypt.compare(password, userExists.password);
        if (userExists.userEmail === userEmail && isMatch) {
          const token = jwt.sign(
            { userId: userExists._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );

          res.send({
            user : userExists,
            success : true,
            message: "Login succcess",
            token: token,
            error : false
          });
        } else {
          res.send({
            success : false,
            message: "Email or password is not found",
          });
        }
      } else {
        res.send({
          success : false,
          message: "Email not found",
        });
      }
    } catch (error) {
      res.send({
        success : false,
        message: "Error Occure",
        error: error.message,
      });
    }
  },

  sendUserResetPasswordEmail: async (req, res) => {
    const { email } = req.body;
    if (email) {
      const isUser = await user.findOne({ userEmail: email });
      if (isUser) {
        const secret = isUser._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ isUserID: isUser._id }, secret, {
          expiresIn: "30m",
        });
        const link = `http://127.0.0.1:3000/api/user/reset/${isUser._id}/${token}`;
        let info = await transporter.sendMail({
          from: process.env.EMAIL,
          to: isUser.userEmail,
          subject: "Password reset link",
          html: `<a href=${link}> click here to reset password </a>`,
        });
        res.send({
          success : true,
          message:
            "Password reset email have been sent\
             check your email:",
          info: info,
        });
      } else {
        res.send({
          success : false,
          message: "User with this email is not found",
        });
      }
    } else {
      res.send({
        success : false,
        message: "Email field required",
      });
    }
  },

  userPasswordReset: async (req, res) => {
    const { id, token } = req.params;
    const { password, confirm_password } = req.body;
    const isUser = await user.findOne({ _id: id });
    console.log("isuser ", isUser);
    const secret = isUser._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token, secret);
      if (password && confirm_password) {
        if (password != confirm_password) {
          res.send({
            success : false,
            message: "Password and confirm password should be same",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          let new_password = await bcrypt.hash(password, salt);
          await user.findByIdAndUpdate(isUser._id, {
            $set: { password: new_password },
          });

          res.send({
            success : true,
            message: "Password reset successfully",
          });
        }
      } else {
        res.send({
          success : false,
          message: "All fields are required",
        });
      }
    } catch (err) {}
  },
};
