const joi = require("@hapi/joi");

const userSchema = {
  registerUser: joi
    .object({
      userName: joi.string().required().empty().min(5).max(20).messages({
        "string.base": `"username" should be a type of 'text'`,
        "string.empty": `"username" cannot be an empty field`,
        "string.min": `"username" should have a minimum length of {#limit}`,
        "string.max": `"username" should have a maximum length of {#limit}`,
        // "any.required": `"username" is a required field`
      }),

      userEmail: joi.string().email().required().empty().messages({
        "string.email": `"Email" required`,
        "string.empty": `"Email" cannot be an empty field`,
        "any.required": `"Email" is a required field`,
      }),

      password: joi.string().required().min(5),

      city: joi.string().required(),

      state: joi.string().required(),

      //    profilePic : joi.string().required()
      //               .messages('Please add profiel pic')
    })
    .unknown(true),

  loginUserValSchema: joi
    .object({
      userEmail: joi.string().email().required().empty().messages({
        "string.email": `"Email" required`,
        "string.empty": `"Email" cannot be an empty field`,
        "any.required": `"Email" is a required field`,
      }),

      password: joi.string().required(),
    })
    .unknown(true),
};

module.exports = userSchema;
