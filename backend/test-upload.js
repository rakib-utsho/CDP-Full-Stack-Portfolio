import { uploadOnCloudinary } from "./utils/cloudinary.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

// Test with a local image
const test = async () => {
  const result = await uploadOnCloudinary("public/temp/test.jpg");
  console.log("Test Result:", result);
};

test();