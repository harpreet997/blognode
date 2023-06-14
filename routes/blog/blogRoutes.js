const express = require("express");
const router = express.Router();
const blog = require("../../controller/blogController");
const { upload } = require("../../middleware/imgUpload");

router.get("/list", blog.blogList);
router.get("/details/:id", blog.blogDetails);
router.post("/addcomment", blog.blogComments);
router.post("/create", upload.single("blogPic"), blog.createBlog);
router.post("/likes/:id/:status", blog.blogLikes);

module.exports = router;
