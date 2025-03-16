import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

// Admin Registration
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { username, email, phone, password } = req.body;

  if (!username || !email || !phone || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with this email is already registered`,
        400
      )
    );
  }

  const admin = await User.create({
    username,
    email,
    phone,
    password,
    role: "Admin",
  });

  generateToken(admin, "Admin created successfully", 201, res);
});

// Admin Login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate Input
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // Find User and Select Password
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Check Password
  const isPasswordMatched = await user.checkPassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Generate Token
  generateToken(user, "Login Successful", 200, res);
});
