const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      //Get token form Header
      token = authorization.split(" ")[1];

      //Check what we are getting in token and authorization
      console.log("Toekn :", token);
      console.log("Authorization :", authorization);
      //Verify token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //Get User from Token
      req.user = await User.findById(userID).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ status: "failed", message: "Unauthorized User" });
    }
  } else if (!token) {
    res.status(401).send({ message: "Unauthorized User No Token " });
  }
};

module.exports = checkUserAuth;
