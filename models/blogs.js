import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //   comments: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Comment",
  //     },
  //   ],
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
