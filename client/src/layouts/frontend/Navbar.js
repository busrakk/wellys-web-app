import React, { useState, useEffect } from "react";
import "./index.css";
import Logo from "../../components/elements/Logo";
import { BiCartAlt, BiSearch, BiUserCircle } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../context/auth";
import Modal from "../../components/frontend/cart/Modal";
import { useSelector } from "react-redux";

import {
  RiUserLine,
  RiUserSettingsLine,
  RiUserReceivedLine,
} from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from 'react-toastify';

const Navbar = () => {
  const location = useLocation();
  const { cartItems } = useSelector((state) => state.cart);
  const [backgroundClass, setBackgroundClass] = useState("white");
  const [textColorClass, setTextColorClass] = useState("black");
  const [hoverColorClass, setHoverColorClass] = useState("gray-100");

  const scrollTo = (id) => {
    let element = document.getElementById(id);

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setBackgroundClass("black");
      setTextColorClass("white");
      setHoverColorClass("gray-600");
    } else {
      setBackgroundClass("white");
      setTextColorClass("black");
      setHoverColorClass("gray-100");
    }
  }, [location]);

  return (
    <div className="bg-black opacity-92 text-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="md:flex justify-between items-center w-5/6 h-16 mx-auto list-none">
        <Logo />
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? (
            <AiOutlineClose size={20} className="cursor-pointer md:hidden" />
          ) : (
            <FiMenu size={20} className="cursor-pointer md:hidden" />
          )}
        </div>

        <div
          className="absolute right-16 top-6 cursor-pointer md:hidden"
          onClick={() => setOpen1(!open1)}
        >
          <div className="relative">
            <BiCartAlt
              size={20}
              className="transition-all duration-200 ease-linear hover:scale-110"
            />
            {cartItems?.length !== 0 && (
              <span className="absolute -top-2 -right-2 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 p-2 text-fontxs text-white">
                {cartItems.length}
              </span>
            )}
            <Modal cartItems={cartItems} open1={open1} setOpen1={setOpen1} />
          </div>
        </div>
        <ul
          className={`menu md:pb-0 pb-6 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-2 opacity-100" : " md:opacity-100 opacity-0"
          }`}
        >
          {location.pathname === "/" ? (
            <>
              <li onClick={() => scrollTo("home")} className="menu-item">
                Home
              </li>
              <li onClick={() => scrollTo("menu")} className="menu-item">
                Menu
              </li>
              <li onClick={() => scrollTo("contact")} className="menu-item">
                Contact
              </li>
            </>
          ) : (
            <>
              <Link to="/" className="menu-item">
                Home
              </Link>
            </>
          )}

          {/* 

          LOGIN VE CART EKLENECEK !!!!!!!!
          
          */}
        </ul>

        <div className="md:flex hidden justify-center items-center gap-8 ">
          <div className="flex justify-center items-center gap-2">
            <BiSearch
              size={20}
              className="transition-all duration-200 ease-linear hover:scale-110"
            />

            <div
              className="flex justify-center items-center gap-1"
              onClick={() => setOpen1(!open1)}
            >
              <div className="relative">
                <BiCartAlt
                  size={20}
                  className="transition-all duration-200 ease-linear hover:scale-110"
                />
                {cartItems?.length !== 0 && (
                  <span className="absolute -top-2 -right-2 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 p-2 text-fontxs text-white">
                    {cartItems.length}
                  </span>
                )}
                <Modal
                  cartItems={cartItems}
                  open1={open1}
                  setOpen1={setOpen1}
                />
              </div>
            </div>
          </div>

          {!auth?.token ? (
            <div
              onClick={() => setOpen(!open)}
              className="flex justify-center cursor-pointer items-center gap-1"
            >
              <div className="relative">
                <BiUserCircle size={22} />
                {open && (
                  <div
                    className={`bg-${backgroundClass} z-0 hover:z-50 p-2 w-52 shadow-lg absolute -left-28 top-10`}
                  >
                    <div className="space-x-4">
                      <div
                        onClick={() => setOpen(false)}
                        className="text-sm cursor-pointer flex flex-col"
                      >
                        {auth?.user?.role !== 0 && auth?.user?.role !== 1 && (
                          <>
                            <Link
                              to="/login"
                              className={` text-${textColorClass} text-fontsm hover:text-${textColorClass} hover:bg-${hoverColorClass} p-2 rounded`}
                            >
                              <div className="flex hover:font-bold items-center space-x-4">
                                {/* <RiUserLine /> */}
                                <span>Login</span>
                              </div>
                            </Link>
                            <Link
                              to="/register"
                              className={` text-${textColorClass} text-fontsm hover:text-${textColorClass} hover:bg-${hoverColorClass} p-2 rounded`}
                            >
                              <div className="flex hover:font-bold items-center space-x-4">
                                {/* <RiUserSettingsLine /> */}
                                <span>Register</span>
                              </div>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <span className="text-fontsm">Log In</span>
            </div>
          ) : (
            <div
              onClick={() => setOpen(!open)}
              className="flex justify-center cursor-pointer items-center gap-1"
            >
              <div className="relative">
                <FaRegUserCircle size={25} />
                {open && (
                  <div
                    className={`bg-${backgroundClass} z-0 hover:z-50 p-2 w-52 shadow-lg absolute -left-28 top-10`}
                  >
                    <div className="space-x-4">
                      <div
                        onClick={() => setOpen(false)}
                        className="text-sm cursor-pointer flex flex-col"
                      >
                        {auth?.user?.role === 1 && (
                          <Link
                            to={"/admin/dashboard"}
                            className={` text-${textColorClass} text-fontsm hover:text-${textColorClass} hover:bg-${hoverColorClass} p-2 rounded`}
                          >
                            <div className="flex hover:font-bold items-center space-x-4">
                              <RiUserLine />
                              <span>Profile</span>
                            </div>
                          </Link>
                        )}
                        {auth?.user?.role === 0 && (
                          <Link
                            to={"/user/dashboard"}
                            className={` text-${textColorClass} text-fontsm hover:text-${textColorClass} hover:bg-${hoverColorClass} p-2 rounded`}
                          >
                            <div className="flex hover:font-bold items-center space-x-4">
                              <RiUserLine />
                              <span>Profile</span>
                            </div>
                          </Link>
                        )}
                        <Link
                          to="/#"
                          className={` text-${textColorClass} text-fontsm hover:text-${textColorClass} hover:bg-${hoverColorClass} p-2 rounded`}
                        >
                          <div className="flex hover:font-bold items-center space-x-4">
                            <RiUserSettingsLine />
                            <span>Settings</span>
                          </div>
                        </Link>
                        <Link
                          to="#"
                          className={` text-${textColorClass} text-fontsm hover:text-${textColorClass} hover:bg-${hoverColorClass} p-2 rounded`}
                          onClick={handleLogout}
                        >
                          <div className="flex hover:font-bold items-center space-x-4">
                            <RiUserReceivedLine />
                            <span>Logout</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <span className="text-fontsm">
                {auth?.user ? auth?.user?.name : "UNDEFIND"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
