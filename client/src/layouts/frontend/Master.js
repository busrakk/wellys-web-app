import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/auth";

const Master = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  return (
    <>
      <Navbar />
      {auth?.user?.role === 0 && location.pathname !== "/" && <Sidebar />}
      <Outlet />
      {location.pathname === "/" && <Footer />}
    </>
  );
};

export default Master;
