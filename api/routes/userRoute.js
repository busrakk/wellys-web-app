import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  userController,
  updateUserController,
  deleteUserController,
  updateProfileController,
  getAddressesByUser,
  deleteAddressByUser,
  addAddressToUser,
  getUserProfile
} from "./../controllers/userController.js";

const router = express.Router();

//routes
//getALl user
router.get("/get-user", requireSignIn, isAdmin, userController);

//update user
router.put("/update-user/:id", requireSignIn, isAdmin, updateUserController);

//delete user
router.delete("/delete-user/:id", requireSignIn, isAdmin, deleteUserController);

//update profile
router.put("/update-profile", requireSignIn, updateProfileController);

// get address by user
router.get("/addresses", requireSignIn, getAddressesByUser);

// delete address by user
router.delete("/address/:addressId", requireSignIn, deleteAddressByUser);

// create address by user
router.post("/add-address", requireSignIn, addAddressToUser);

//update profile
router.get("/profile", requireSignIn, getUserProfile);

export default router;
