import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    undefined: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  status: {
    type: String,
    required: true,
    default: 1,
  },
});

export default mongoose.model("Category", categorySchema);
