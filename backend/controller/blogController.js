import { Blog } from "../models/blogSchema.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { cloudinary } from "../utils/cloudinary.js";

// Create Blog

export const createBlog = catchAsyncErrors(async (req, res, next) => {
  const { title, content } = req.body;
  const createdBy = req.user._id;

  if (!req.file) return next(new ErrorHandler("Blog image is required", 400));

  const localFilePath = req.file.path;
  const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

  if (!cloudinaryResponse)
    return next(new ErrorHandler("Image upload failed", 500));

  const blog = await Blog.create({
    title,
    content,
    image: {
      url: cloudinaryResponse.secure_url,
      filename: cloudinaryResponse.public_id,
    },
    createdBy,
  });
  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    blog,
  });
});

// Update Blog

export const updateBlog = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const blog = await Blog.findById(id);
  if (!blog) return next(new ErrorHandler("Blog not found", 400));

  // update image if new file uploaded
  if (req.file) {
    const localFilePath = req.file.path;
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResponse)
      return next(new ErrorHandler("Image upload failed", 500));

    // Delete old image from cloudinary
    await cloudinary.uploader.destroy(blog.image.filename);

    blog.image.url = cloudinaryResponse.secure_url;
    blog.image.filename = cloudinaryResponse.public_id;
  }

  if (title) blog.title = title;
  if (content) blog.content = content;

  await blog.save();

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    blog,
  });
});

// Delete Blog
export const deleteBlog = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);
  if (!blog) return next(new ErrorHandler("Blog not found", 404));

  // Delete image from cloudinary
  await cloudinary.uploader.destroy(blog.image.filename);

  await Blog.deleteOne({ _id: id });

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

// Get Blog by ID
export const getBlogId = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  // Fetch blog with author details
  const blog = await Blog.findById(id).populate("createdBy", "name email");

  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  // Return blog as response
  res.status(200).json({
    success: true,
    blog,
  });
});


// Get All Blogs
export const getAllBlogs = catchAsyncErrors(async (req, res) => {
  const blogs = await Blog.find().populate("createdBy", "name email");
  res.status(200).json({ success: true, blogs });
});
