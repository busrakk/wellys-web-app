import React, { useState } from "react";
import "./index.css";
import Logo from "../../components/elements/Logo";
import { BiCartAlt, BiSearch, BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../context/auth";
import { RiAdminLine } from "react-icons/ri";

const Navbar = () => {
  const scrollTo = (id) => {
    let element = document.getElementById(id);

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useAuth();

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
        <ul
          className={`menu md:pb-0 pb-6 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-2 opacity-100" : " md:opacity-100 opacity-0"
          }`}
        >
          <li onClick={() => scrollTo("home")} className="menu-item">
            Home
          </li>
          <li onClick={() => scrollTo("menu")} className="menu-item">
            Menu
          </li>
          <li onClick={() => scrollTo("contact")} className="menu-item">
            Contact
          </li>
          {auth?.user?.role === 1 ? (
            <li className="md:hidden flex p-4">
              <Link
                to="/admin/dashboard"
                className="flex justify-center items-center gap-1"
              >
                <RiAdminLine size={22} />
                <span className="text-fontsm">{auth?.user?.name}</span>
              </Link>
            </li>
          ) : (
            <li className="md:hidden flex p-4">
              <Link
                to="/login"
                className="flex justify-center items-center gap-1"
              >
                <BiUserCircle size={22} />
                <span className="text-fontsm">Log In</span>
              </Link>
            </li>
          )}
        </ul>
        <div className="md:flex hidden justify-center items-center gap-8 ">
          <div className="flex justify-center items-center gap-2">
            <BiSearch
              size={20}
              className="transition-all duration-200 ease-linear hover:scale-110"
            />
            <BiCartAlt
              size={20}
              className="transition-all duration-200 ease-linear hover:scale-110"
            />
          </div>
          {auth?.user?.role === 1 ? (
            <Link
              to="/admin/dashboard"
              className="flex justify-center items-center gap-1 transition-all duration-200 ease-linear hover:scale-110"
            >
              <RiAdminLine size={22} />
              <span className="text-fontsm">{auth?.user?.name}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex justify-center items-center gap-1 transition-all duration-200 ease-linear hover:scale-110"
            >
              <BiUserCircle size={22} />
              <span className="text-fontsm">Log In</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
