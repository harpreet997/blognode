require("dotenv").config();
require("./model/config");
var express = require("express");
var cors = require('cors')
const router = require("./routes/mainRoutes");
const bodyParser = require("body-parser");
const blogRoute = require("./routes/blog/blogRoutes");
var app = express();

app.use(cors())
app.use(bodyParser.json());
app.use("/blog", blogRoute);
app.use("/", router);
var port = process.env.PORT || 7000
app.listen(port, (req, res) => {
  console.log(`Server is running on port no: ${process.env.PORT}`);
});

module.exports = app;

