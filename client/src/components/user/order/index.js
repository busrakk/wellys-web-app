import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import moment from "moment";
import { AiOutlineEye } from "react-icons/ai";
import Item from "./Item";

const Order = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) getAllOrders();
    if (!auth.token) {
      navigate("/login");
    }
  }, [auth?.token, auth, navigate]);

  // get all orders
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/order/orders`
      );
      if (data.success) {
        setIsLoading(false);
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleProducts = (products) => {
    setSelectedProducts(products);
    setShow(true);
  };

  const renderTable = () => {
    let view = [];
    orders?.map((item, i) => {
      view.push(
        <tr key={item._id} className="hover:bg-gray-50">
          <td className="px-6 py-4">{i + 1}</td>
          <td className="px-6 py-4 hidden md:block">
            {item.status === "Ready" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                {item?.status}
              </span>
            ) : item.status === "Preparing" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-600"></span>
                {item?.status}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                {item?.status}
              </span>
            )}
          </td>
          <td className="px-6 py-4">{item?.buyer?.name}</td>
          <td className="px-6 py-4">{moment(item?.createdAt).fromNow()}</td>
          <td className="px-6 py-4">{item?.payment} $</td>
          <td className="px-6 py-4">
            <AiOutlineEye
              onClick={() => handleProducts(item?.products)}
              className="h-6 w-6 hover:text-blue-600"
            />
          </td>
        </tr>
      );
      return view;
    });
    if (view.length === 0) {
      return (
        <tr>
          <td colSpan={4} className="text-center p-4">
            No data found!
          </td>
        </tr>
      );
    } else {
      return view;
    }
  };

  return (
    <div className="h-full ml-14 mt-20 mb-10 md:ml-64 fixed overflow-x:hidden overflow-y-scroll w-4/5 pb-24">
      <div className="mt-4 text-fontlg font-semibold flex justify-between md:mx-40 mx-10">
        <span> My Orders</span>
      </div>

      {show && <Item selectedProducts={selectedProducts} setShow={setShow} />}

      <div className="flex justify-center">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-3/4">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  #
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Buyer
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Orders
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Payment
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900 hidden md:block"
                >
                  Items
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {isLoading && (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    <div>
                      <span>Loading...</span>
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading && renderTable()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
