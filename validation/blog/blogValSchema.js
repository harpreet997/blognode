const joi = require("@hapi/joi");

module.exports = {
  createBlog: joi
    .object({
      title: joi.string().required().empty().min(5).max(20).messages({
        "string.empty": `"Blog" cannot be an empty field`,
        "string.min": `"Blog" should have a minimum length of {#limit}`,
        "string.max": `"Blog" should have a maximum length of {#limit}`,
      }),

      description: joi.string().required().empty().min(5).max(200).messages({
        "string.empty": `"Blog" cannot be an empty field`,
        "string.min": `"Blog" should have a minimum length of {#limit}`,
        "string.max": `"Blog" should have a maximum length of {#limit}`,
      }),
    })
    .unknown(true),

  createComment: joi.object({
    description: joi.string().required().empty().min(5).max(20).messages({
      "string.empty": `"Blog" cannot be an empty field`,
      "string.min": `"Blog" should have a minimum length of {#limit}`,
      "string.max": `"Blog" should have a maximum length of {#limit}`,
    }),
  }),
};
