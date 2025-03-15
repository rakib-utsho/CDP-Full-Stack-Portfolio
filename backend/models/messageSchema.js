import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must be at least 3 characters long!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter a valid email!"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone must be at least 11 Digits!"],
    maxLength: [11, "Phone must be at least 11 Digits!"],
  },
  message: {
    type: String,
    required: true,
    minLength: [10, "Message must be at least 10 Characters!"],
  },
});

export const Message = mongoose.model("Message", messageSchema);
