const Blog = require("../model/blogSchema");
const Comment = require("../model/commentSchema");

module.exports = {
  createBlog: async (req, res) => {
    try {
      console.log(req.body);
      const addBlog = Blog(req.body);
      const filePath = `/uploads/${req.file.filename}`;
      addBlog.blogPic = filePath;
      let result = await addBlog.save();
      res.status(201).send({
        success: true,
        message: "Blog created successfully",
      });
    } catch (err) {
      res.send({
        success: false,
        message: "Error occure",
        error: err.message,
      });
    }
  },


  //  blogList : async (req, res) => {
  //   try {
  //     const blogs = await Blog
  //       .find({
  //         $or: [
  //           { title: { $regex: req.query.search, $options: "i" } },
  //           { description: { $regex: req.query.search, $options: "i" } },
  //         ],
  //       })
  //       .populate({
  //         path: "userId",
  //         select: "userName profilePIc",
  //       });
  //     if (blogs[0] !== undefined) {
  //       res.status(200).json({
  //         success: true,
  //         message: "All blog fetched successfully",
  //         blog: blogs,
  //       });
  //     } else {
  //       res.status(404).json({
  //         success: false,
  //         message: "Blogs not available",
  //       });
  //     }
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: `Error occur ${error.message}`,
  //     });
  //    }
  //  },

  blogList: async (req, res) => {
    try {
      const blogs = await Blog.find({})
        .populate("user_id", {
          userName: 1,
          _id: 0,
        })
        .sort({ createdAt: 1 });
      console.log("...", blogs);
      if (blogs.length > 0) {
        res.send({
          success: true,
          messsage: "All blog list",
          blogs: blogs,
        });
      } else {
        res.send({
          success: false,
          message: "No Blog Found",
        });
      }
    } catch (err) {
      res.send({
        success: false,
        Error: err.message,
      });
    }
  },

  blogComments: async (req, res) => {
    try {
      console.log(req.body);
      const addComment = Comment(req.body);
      let result = await addComment.save();
      res.status(201).send({
        success: true,
        message: "Comment added sucessfully",
      });
    } catch (err) {
      res.send({
        success: false,
        message: "Error Occure",
        Error: err.message,
      });
    }
  },

  blogDetails: async (req, res) => {
    var messages;
    try {
      const id = req.params.id;
      const blogComments = await Comment.find({ blog_id: id })
        .select({ comment: 1, createdAt: 1, _id: 0 })
        .sort({ createdAt: 1 })
        .populate("user_id", { userName: 1, profilePic: 1, _id: 0 })
        .exec(
          await function (err, data) {
            if (err) {
              res.send({
                success: false,
                message: "Error Occure",
                Error: err.message,
              });
            } else {
              messages = data;
              console.log("mmm", messages);
            }
          }
        );
      console.log("Blog id", id);
      console.log("com", blogComments);
      Blog.findById(req.params.id)
        .populate("user_id", { userName: 1, _id: 0 })
        .exec(function (err, blog) {
          if (err) {
            res.send({
              success: false,
              message: "Error Occure",
              Error: err.message,
            });
          } else {
            res.status(200).send({
              success: true,
              messsage: "Blog details",
              blogs: blog,
              message: messages,
            });
          }
        });
    } catch (err) {
      res.send({
        success: false,
        message: "Error occure",
        Error: err.message,
      });
    }
  },

  blogLikes: async (req, res) => {
    try {
      const { id, status } = req.params;
      const blogLikes = await Blog.findOne({ _id: id }).exec();
      let likes = await blogLikes.likes;
      if (status == "true") {
        likes += 1;
      } else {
        likes -= 1;
      }
      blogLikes.likes = likes;
      await Blog.findByIdAndUpdate(id, blogLikes, {
        new: true,
        runValidators: true,
      });
      res.status(200).send({
        success: true,
        message: "Likes addes successfully",
        like: blogLikes,
      });
    } catch (err) {
      res.send({
        success: false,
        message: "Error occure",
        error: err.message,
      });
    }
  },
};
