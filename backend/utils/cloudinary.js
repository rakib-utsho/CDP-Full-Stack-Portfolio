import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("Attempting upload. Local path:", localFilePath);

    if (!localFilePath) {
      console.log("No file path provided");
      return null;
    }

    // Verify file exists
    if (!fs.existsSync(localFilePath)) {
      console.log("File not found:", localFilePath);
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "blogs",
      resource_type: "auto",
    });

    console.log("Upload success. URL:", response.secure_url);
    return response;
  } catch (error) {
    console.log("Cloudinary Error:", error.message);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { uploadOnCloudinary, cloudinary };
