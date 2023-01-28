import express from "express";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../controllers/blogs.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

//DEFAULT ROUTE
router.get("/", getBlogs);

// TO CREATE A NEW BLOG
router.post("/create", verifyToken, createBlog);

//TO UPDATE BLOG
router.put("/update/:id", verifyToken, updateBlog);

//TO DELETE BLOG
router.delete("/delete/:id", verifyToken, deleteBlog);

export default router;
