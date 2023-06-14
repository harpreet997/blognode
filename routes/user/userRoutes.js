const express = require("express");
const router = express.Router();
const userBlog = require("../../controller/userBlog");
const { upload } = require("../../middleware/imgUpload");
const userController = require("../../controller/userController");
const userValidation = require("../../validation/user/userValidation");
const jwtAuth = require("../../middleware/jwtAuth");

router.get("/blogs/:id", jwtAuth, userBlog.userBlogs);
router.patch("/blog-edit/:id", userBlog.userBlogEdit);
router.delete("/blog-delete/:id", userBlog.userBlogDelete);
router.post("/reset-password/:id/:token", userController.userPasswordReset);
router.post(
  "/create",
  upload.single("profilePic"),
  userController.registerUser
);
router.post(
  "/login",
  userValidation.userLoginValidation,
  userController.userLogin
);
router.post(
  "/send-reset-password-email",
  userController.sendUserResetPasswordEmail
);

module.exports = router;
//userValidation.registerUserValidation,
