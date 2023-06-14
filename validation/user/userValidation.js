const userSchema = require("./userValSchema");

module.exports = {
  registerUserValidation: async (req, res, next) => {
    console.log("***", req.body);
    const value = userSchema.registerUser.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      res.json({
        success: 0,
        message: value.error.details[0].message,
      });
    } else {
      console.log("User validation successfull");
      next();
    }
  },

  userLoginValidation: async (req, res, next) => {
    console.log("***", req.body);
    const value = userSchema.loginUserValSchema.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      res.json({
        success: 0,
        message: value.error.details[0].message,
      });
    } else {
      console.log("User validation successfull");
      next();
    }
  },
};
