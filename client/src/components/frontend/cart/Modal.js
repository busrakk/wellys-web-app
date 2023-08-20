import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart } from "../../../redux/cartSlice";
import { toast } from 'react-toastify';
import { useAuth } from "../../../context/auth";

const Modal = ({ cartItems, open1, setOpen1 }) => {
  const [auth, setAuth] = useAuth();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleDeleteItem = (item) => {
    dispatch(deleteCart(item));
    toast.success(`${item.name} successfully deleted`);
  };
  
  const handleCheckout = () => {
    if (auth.token) {
      toast.success("You are redirected to the cart page.", {
        autoClose: 3000,
      });
    } else {
      toast.info("You need to log in to proceed with the order.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {open1 && (
        <>
          <div
            className="relative z-50"
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <div className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <h2
                            className="text-fontlg font-medium text-gray-900"
                            id="slide-over-title"
                          >
                            My Cart
                          </h2>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              onClick={() => setOpen1(!open1)}
                              className="-m-2 p-2 text-gray-400 hover:text-gray-900"
                              aria-label="Close panel"
                            >
                              <span className="sr-only">Close panel</span>
                              <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokellinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <div
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartItems?.length > 0 ? (
                                <>
                                  {cartItems.map((item) => {
                                    return (
                                      <li key={item._id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                          <img
                                            src={`${process.env.REACT_APP_BACKEND_ROOT_URL}/api/product/product-photo/${item._id}`}
                                            alt={item.name}
                                            className="h-full w-full object-cover object-center"
                                          />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                          <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                              <h3>
                                                <Link to="#">{item.name}</Link>
                                              </h3>
                                              <p className="ml-4">
                                                $ {item.price}
                                              </p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 flex justify-between text-base font-medium">
                                              {item.description}
                                            </p>
                                          </div>
                                          <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">
                                              x {item.quantity}
                                            </p>
                                            <div className="flex">
                                              <button
                                                onClick={() =>
                                                  handleDeleteItem(item)
                                                }
                                                className="font-medium text-red-600 hover:text-red-500"
                                              >
                                                Delete
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </>
                              ) : (
                                <div className="flex py-1">
                                  <div className="flex justify-center mt-4">
                                    <div className="flex w-full max-w-6xl overflow-hidden bg-white rounded-lg shadow-md">
                                      <div className="px-4 py-2 -mx-3">
                                        <div className="mx-3">
                                          <p className="text-base font-medium m-2 text-gray-800">
                                            There are no items in the cart.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total: </p>
                          <p>$ {cart.total > 0 ? cart.total.toFixed(2) : 0}</p>
                        </div>
                        {cartItems.length > 0 ? (
                          <div className="mt-6">
                            <Link
                              to={auth?.token ? "/user/cart" : "/login"}
                              onClick={handleCheckout}
                              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              <button>Checkout</button>
                            </Link>
                          </div>
                        ) : (
                          <div className="mt-6">
                            <div className="flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm">
                              <button disabled>Checkout</button>
                            </div>
                          </div>
                        )}
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            <Link
                              to="/"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Continue
                              <span aria-hidden="true"> &rarr;</span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
