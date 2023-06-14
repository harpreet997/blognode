const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  blogPic: {
    type: String,
    //   required : true
  },

  likes: {
    type: Number,
    default: 0,
  },

  status: {
    type: Boolean,
    default: true,
  },

  isActive: {
    type: String,
    default: true,
  },
});
blogSchema.set("timestamps", true);
module.exports = mongoose.model("blogs", blogSchema);
