import express from "express";
import {
  createOrdersController,
  getAllOrdersController,
  getOrdersController,
  orderStatusController,
} from "../controllers/orderController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

//orders
router.get("/orders", requireSignIn, getOrdersController);

//admin orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//create order
router.post("/create", requireSignIn, createOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
