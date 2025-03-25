import express from "express";
import { upload } from "../middlewares/multerConfig.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlogId,
} from "../controller/blogController.js";

const router = express.Router();

// Get all Blogs
router.get("/all", getAllBlogs);

// Get Blog By ID
router.get("/:id", getBlogId);

// create new blog
router.post(
  "/create",
  isAdminAuthenticated,
  upload.single("image"),
  createBlog
);

// update blog
router.put(
  "/update/:id",
  isAdminAuthenticated,
  upload.single("image"),
  updateBlog
);

// delete blog
router.delete("/delete/:id", isAdminAuthenticated, deleteBlog);

export default router;
