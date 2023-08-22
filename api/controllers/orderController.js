import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

// orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name address phone")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "All orders listed successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};

// admin orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name address phone")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "All orders listed successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};

// create order
export const createOrdersController = async (req, res) => {
  try {
    const { cart } = req.body;
    let total = 0;
    //let totalQ = 0;
    cart.map((i) => {
      total += i.price * i.quantity;
      //totalQ += i.quantity
    });

    const order = new orderModel({
      products: cart,
      payment: total,
      //quantity: totalQ,
      buyer: req.user._id,
    });
    await order.save();

    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json({
      success: true,
      message: "Order status updated successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
