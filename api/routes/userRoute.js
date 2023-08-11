import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  userController,
  updateUserController,
  deleteUserController,
} from "./../controllers/userController.js";

const router = express.Router();

//routes
//getALl user
router.get("/get-user", requireSignIn, isAdmin, userController);

//update user
router.put("/update-user/:id", requireSignIn, isAdmin, updateUserController);

//delete user
router.delete("/delete-user/:id", requireSignIn, isAdmin, deleteUserController);

export default router;
