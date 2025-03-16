import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message) {
    return next(new ErrorHandler("Please fill in all fields!", 400));
  }
  await Message.create({ name, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message Sent Successfully!",
  });
});
