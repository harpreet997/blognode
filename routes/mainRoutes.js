const express = require("express");
const router = express.Router();
const userRoutes = require("./user/userRoutes");
const blogRoutes = require("../routes/blog/blogRoutes");

router.use("/user", userRoutes);
router.use("/blog", blogRoutes);

module.exports = router;

