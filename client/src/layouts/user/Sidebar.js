import React from "react";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { CgWebsite } from "react-icons/cg";
import { GiForkKnifeSpoon } from "react-icons/gi";

const Sidebar = () => {
  return (
    <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64  h-full shadow-md bg-white text-gray-900 transition-all duration-300 border-none z-10 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-600 uppercase">
                Main
              </div>
            </div>
          </li>
          <li>
            <Link
              to="/user/orders"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-600 text-white-600 hover:text-white border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <GiForkKnifeSpoon size={24} className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Orders
              </span>
            </Link>
          </li>

          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center mt-5 h-8">
              <div className="text-sm font-light tracking-wide text-gray-600 uppercase">
                Settings
              </div>
            </div>
          </li>
          <li>
            <Link
              to="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-600 text-white-600 hover:text-white border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <BiUser size={24} className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Profile
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-600 text-white-600 hover:text-white border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FiSettings size={24} className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Settings
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-600 text-white-600 hover:text-white border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <CgWebsite size={24} className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Wellys
              </span>
            </Link>
          </li>
        </ul>
        <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
          Copyright @2023
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
