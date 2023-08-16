import React from "react";
import Item from "./Item";

const Cart = () => {
  return (
    <div className="mb-10 w-screen relative mt-8 py-14 bg-white">
      <div className="bg-gray-50 pb-10">
        <h1 className="md:mb-6 mb-2 pt-4 text-center md:text-fontlg text-fontmd font-medium">
          My Cart (0 Food)
        </h1>
        {/* {totalQuantity > 0 ? ( */}
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            <Item />
          </div>
          {/* <!-- Sub total --> */}

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            {/* <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Number of Foods</p>
              <p className="text-gray-700">x {itemsCount}</p>
            </div> */}
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Total Foods</p>
              <p className="text-gray-700">300 $</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Kargo Total</p>
              <p className="text-gray-700">4.99 $</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">300 $</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
            <button className="mt-6 w-full rounded-md bg-red-500 py-1.5 font-medium text-red-50 hover:bg-red-600">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
