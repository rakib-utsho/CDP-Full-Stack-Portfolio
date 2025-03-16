import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const checkDuplicateUsername = async (req, res, next) => {
    try {
      const { username, email } = req.body;
  
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return next(
          new ErrorHandler(
            `The ${existingUser.username === username ? "username" : "email"} is already taken!`,
            400
          )
        );
      }
  
      next(); // Proceed if no duplicates
    } catch (error) {
      next(error);
    }
  };