import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }
  await Message.create({ name, email, phone, message });
  res.status(201).json({
    success: true,
    message: "Message Sent Successfully!",
  });
});
