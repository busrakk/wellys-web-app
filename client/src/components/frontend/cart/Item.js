import React from "react";
import { RiDeleteBin5Line, RiHeartLine } from "react-icons/ri";

const Item = () => {
  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src="https://picsum.photos/200/300"
        alt=""
        className="w-full rounded-lg sm:w-40 h-36"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">name</h2>
          <p className="mt-1 text-xs text-gray-700">categories name</p>
          <div className="mt-8 space-x-2">
            <button className="bg-indigo-700 text-white cursor-pointer duration-150 hover:bg-indigo-500">
              <RiHeartLine className="m-2 h-4 w-4" />
            </button>
            <button className="bg-red-700 text-white cursor-pointer duration-150 hover:bg-red-500">
              <RiDeleteBin5Line className="m-2 h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
              <button className="h-3 w-3 items-center rounded-l cursor-pointer outline-none">
                <span className="m-auto text-2xl font-thin">−</span>
              </button>
            </span>
            <input
              className="h-9 w-9 border bg-white text-center text-xs outline-none"
              type="number"
              name="quantity"
              value="1"
              min="0"
              max=""
            />
            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
              <button className="h-3 w-3 items-center rounded-l cursor-pointer outline-none">
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-xl">10 $</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
