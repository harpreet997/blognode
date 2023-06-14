const Blog = require("../model/blogSchema");

module.exports = {
  userBlogs: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const blogs = await Blog.find({ user_id: id }).exec();
      res.send({
        success: true,
        messsage: "All blog lists",
        allBlogs: blogs,
      });
    } catch (err) {
      res.send({
        success: false,  
        message: "Error occure",
        error: err.message,
      });
    }
  },

  userBlogEdit: async (req, res) => {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.send({
        success: true,
        messsage: "Blog updated successfully",
        blog: blog,
      });
    } catch (err) {
      res.send({
        success: false,
        message: "Error occure",
        error: err.message,
      });
    }
  },

  userBlogDelete: async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
      const blog = await Blog.findByIdAndRemove(req.params.id);
      res.send({
        success: true,
        messsage: "Blog deleted successfully",
        blog: blog,
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
