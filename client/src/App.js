import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./layouts/auth/Login";
import Register from "./layouts/auth/Register";
import Master from "./layouts/frontend/Master";
import Home from "./components/frontend/sections/Home";
import Page404 from "./layouts/error/Page404";
import Dashboard from "./components/admin/Dashboard";
import Category from "./components/admin/category";
import Product from "./components/admin/product";
import Users from "./components/admin/user";
import AdminRoute from "./components/Routes/AdminRoute";
import UserRoute from "./components/Routes/UserRoute";
import Cart from "./components/frontend/cart";
import Order from "./components/user/order"
import { useSelector } from "react-redux";
import Profile from "./components/user/profile";
import AdminOrder from "./components/admin/order";

function App() {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Master />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="/user/" element={<UserRoute />}>
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="order" element={<Order />} />
        </Route>
        <Route path="/admin/" element={<AdminRoute />}>
          <Route path="" element={<Navigate replace to="/admin/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="product" element={<Product />} />
          <Route path="users" element={<Users />} />
          <Route path="order" element={<AdminOrder />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
