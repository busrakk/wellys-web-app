import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  street: { 
    type: String, 
    required: true 
  },
  city: { 
    type: String, 
    required: true 
  },
  postalCode: { 
    type: String, 
    required: true 
  },
  country: { 
    type: String, 
    required: true 
  },
});

export default mongoose.model("Address", addressSchema);
