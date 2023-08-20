import userModel from "../models/userModel.js";
import addressModel from "../models/addressModel.js";
import { hashPassword } from "./../helpers/authHelper.js";

// get all user
export const userController = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "All Users List",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all users",
    });
  }
};

//update user
export const updateUserController = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
    res.status(200).send({
      success: true,
      messsage: "User Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating user",
    });
  }
};

//delete user
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting user",
      error,
    });
  }
};

// update profil
export const updateProfileController = async (req, res) => {
  try {
    const { name, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;

    let updatedAddress = user.address;
    if (address) {
      if (!user.address) {
        const newAddress = new addressModel(address);
        await newAddress.save();
        updatedAddress = newAddress._id;
      } else {
        updatedAddress = await addressModel.insertMany(address);
      }
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: updatedAddress,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
  }
};

// get adress by user
export const getAddressesByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId).populate("address");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const addresses = user.address;
    res.status(200).json({ 
      success: true,
      message: "Address Listed SUccessfully",
      addresses 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching addresses" });
  }
};

// delete adress by user
export const deleteAddressByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressIdToDelete = req.params.addressId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.address.pull(addressIdToDelete);
    await user.save();

    await addressModel.findByIdAndDelete(addressIdToDelete);

    res.status(200).json({ 
      success: true,
      message: "Address deleted successfully" 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while deleting address" });
  }
};

// crate adress by user
export const addAddressToUser = async (req, res) => {
  try {
    const userId = await userModel.findById(req.user._id);
    const { title, street, city, postalCode, country } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newAddress = new addressModel({
      title,
      street,
      city,
      postalCode,
      country,
    });

    user.address.push(newAddress);
    await newAddress.save();
    await user.save();

    res.status(201).json({ 
      success: true,
      message: "Address added successfully",
      address: newAddress 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while adding address" });
  }
};
