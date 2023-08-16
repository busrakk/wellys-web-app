import React from "react";
import { Link } from "react-router-dom";

const Modal = ({ carts, open1, setOpen1 }) => {
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
                            className="text-lg font-medium text-gray-900"
                            id="slide-over-title"
                          >
                            My Cart
                          </h2>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              onClick={() => setOpen1(!open1)}
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
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
                              {/* {carts?.length > 0 ? (
                                <>
                                  {carts.map((cart) => {
                                    return ( */}
                                      <li className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                          <img
                                            src="https://picsum.photos/200/300"
                                            alt=""
                                            className="h-full w-full object-cover object-center"
                                          />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                          <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                              <h3>
                                                <Link to="#">name</Link>
                                              </h3>
                                              <p className="ml-4">$ 80</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 flex justify-between text-base font-medium">
                                              description
                                            </p>
                                          </div>
                                          <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">x 2</p>
                                            <div className="flex">
                                              <button className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Sil
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    {/* );
                                  })}
                                </>
                              ) : (
                                <div className="flex py-1">
                                  <div className="flex justify-center mt-4">
                                    <div className="flex w-full max-w-6xl overflow-hidden bg-white rounded-lg shadow-md">
                                      <div className="px-4 py-2 -mx-3">
                                        <div className="mx-3">
                                          <p className="text-base font-medium m-2 text-gray-800">
                                            There are no foods in the cart.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )} */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total: </p>
                          <p>$ 85</p>
                        </div>
                        {/* <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p> */}
                        <div className="mt-6">
                          <Link
                            to="/cart"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </Link>
                        </div>
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
