import React, { useEffect } from "react";
import Item from "./Item";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../redux/cartSlice";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Swal from "sweetalert2";
import { useAuth } from "../../../context/auth";
import { toast } from "react-toastify";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token && cart.cartItems.length > 0) {
      toast.error("You have items in your cart. Please log in to continue.", {
        duration: 3000,
      });
      navigate("/login");
    }
  }, [auth, cart, navigate]);

  // console.log(auth.user.address || "N/A")

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
      <div className="h-96 md:pl-40 pl-20">
        <div className="flex justify-center mt-40">
          <div className="flex w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 bg-blue-500">
              <HiOutlineShoppingBag className="w-5 h-5 text-white" />
            </div>

            <div className="px-4 py-2 -mx-3">
              <div className="mx-3">
                <p className="text-base font-medium m-2 text-gray-800 space-x-4">
                  <span>There are no items in the cart.</span>
                  {/* <Link to="/" className="font-bold underline">
                    Back To Homepage!
                  </Link> */}
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
      {auth?.token && (
        <div className="mb-10 w-screen h-screen relative mt-8 py-14 bg-white md:pl-40 pl-12">
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

              <div className="flex-col h-full md:w-2/5">
                <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-2">
                    <label
                      htmlFor="address"
                      className="font-bold flex items-center"
                    >
                      Address:
                    </label>
                    <textarea
                      id="address"
                      type="address"
                      name="address"
                      className="text-fontxs sm:text-fontsm placeholder-gray-500 pl-2 py-1 rounded-lg border border-gray-200 w-full focus:outline-none focus:border-indigo-400 h-24 resize-y"
                      placeholder="Address"
                      disabled
                      value={auth.user.address || "Null"}
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="phone"
                      className="font-bold flex items-center"
                    >
                      Mobile:
                    </label>
                    <input
                      id="phone"
                      type="phone"
                      name="phone"
                      className="text-fontxs sm:text-fontsm placeholder-gray-500 pl-2 py-1 rounded-lg border border-gray-200 w-full focus:outline-none focus:border-indigo-400"
                      placeholder="Phone"
                      disabled
                      value={auth.user.phone || "Null"}
                    />
                  </div>
                  <Link to="/user/profile">
                    <button className="mt-2 w-full rounded-md bg-indigo-500 py-1.5 font-medium text-indigo-50 hover:bg-indigo-600">
                      Update
                    </button>
                  </Link>
                </div>

                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md">
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
        </div>
      )}
    </>
  );
};

export default Cart;
