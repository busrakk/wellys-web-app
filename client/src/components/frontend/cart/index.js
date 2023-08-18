import React, { useEffect, useState } from "react";
import Item from "./Item";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../redux/cartSlice";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Swal from "sweetalert2";
import { useAuth } from "../../../context/auth";
import Login from "../../../layouts/auth/Login";
import toast from "react-hot-toast";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    if (!auth?.user && !auth.token) {
      toast.error("You have items in your cart", {
        duration: 3000,
      });
      setShowLoginMessage(true);
    }
  }, [auth]);

  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will clear the cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(reset());
        Swal.fire("Cleared!", "The cart has been cleared.", "success");
      }
    });
  };

  if (cart.cartItems.length === 0) {
    return (
      <div className="h-96">
        <div className="flex justify-center mt-40">
          <div className="flex w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 bg-blue-500">
              <HiOutlineShoppingBag className="w-5 h-5 text-white" />
            </div>

            <div className="px-4 py-2 -mx-3">
              <div className="mx-3">
                <p className="text-base font-medium m-2 text-gray-800 space-x-4">
                  <span>There are no items in the cart.</span>
                  <Link to="/" className="font-bold underline">
                    Back To Homepage!
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // console.log(cart)
  return (
    <>
      {auth?.token ? (
        <div className="mb-10 w-screen relative mt-8 py-14 bg-white">
          <div className="bg-gray-50 pb-10">
            <h1 className="md:mb-6 mb-2 pt-4 text-center md:text-fontlg text-fontmd font-medium">
              My Cart ({cart.cartItems.length} Food)
            </h1>
            {/* {totalQuantity > 0 ? ( */}
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                {cart.cartItems.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
              </div>
              {/* <!-- Sub total --> */}

              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                {/* <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Number of Foods</p>
              <p className="text-gray-700">x {itemsCount}</p>
            </div> */}
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Total Foods</p>
                  <p className="text-gray-700">{cart.total.toFixed(2)} $</p>
                </div>
                {/* <div className="flex justify-between">
              <p className="text-gray-700">Kargo Total</p>
              <p className="text-gray-700">4.99 $</p>
            </div> */}
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">
                      {cart.total.toFixed(2)} $
                    </p>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                  Order Now
                </button>
                <button
                  onClick={handleClearCart}
                  className="mt-6 w-full rounded-md bg-red-500 py-1.5 font-medium text-red-50 hover:bg-red-600"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>{showLoginMessage && <Login />}</>
      )}
    </>
  );
};

export default Cart;