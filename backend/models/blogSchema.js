import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
  },
  content: {
    type: String,
    required: [true, 'Blog content is required'],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export const Blog = mongoose.model('Blog', blogSchema);
