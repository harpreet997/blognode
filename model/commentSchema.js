const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  blog_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogs",
  },
  comment: {
    type: String,
    required: true,
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
commentSchema.set("timestamps", true);
module.exports = mongoose.model("comments", commentSchema);
