import Blog from "../models/blogs.js";
import { faker } from "@faker-js/faker";

export const createBlog = async (req, res) => {
  try {
    // const { title, content } = req.body;
    // for demo purpose added faker to genrate blog post
    const title = faker.lorem.sentence();
    const content = faker.lorem.paragraph();
    const author = req.userId;
    const newBlog = new Blog({
      title,
      content,
      author,
    });
    await newBlog.save();
    res.status(201).json({
      message: "Blog created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userID = req.userId;
    const blog = await Blog.findById(req.params.id);
    if (blog.author == userID) {
      await Blog.findByIdAndUpdate(req.params.id, {
        title,
        content,
      });
      res.status(200).json({
        message: "Blog updated successfully",
      });
    } else {
      res.status(403).json({
        message: "You are not authorized to update this blog",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    //User ID from middleware
    const userID = req.userId;
    const blog = await Blog.findById(req.params.id);
    if (blog.author == userID) {
      await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Blog deleted successfully",
      });
    } else {
      res.status(403).json({
        message: "You are not authorized to delete this blog",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const blogs = await Blog.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.status(200).json({
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
