const blogSchema = require("./blogValSchema");

module.exports = {
  createBlogValidation: async (req, res, next) => {
    console.log("***", req.body);
    const value = blogSchema.createBlog.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      res.json({
        success: 0,
        message: value.error.details[0].message,
      });
    } else {
      console.log("Blog Validation Successfull");
      next();
    }
  },

  addComment: async (req, res, next) => {
    console.log("***", req.body);
    const value = blogSchema.createComment.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      res.json({
        success: 0,
        message: value.error.details[0].message,
      });
    } else {
      console.log("Blog comment validation successfull");
      next();
    }
  },
};
