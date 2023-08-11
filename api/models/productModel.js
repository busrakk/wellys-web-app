import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    featured: {
      type: String,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
