import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import moment from "moment";
import { AiOutlineEye } from "react-icons/ai";
import Item from "./Item";
import Buyer from "./Buyer";

const AdminOrder = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showBuyer, setShowBuyer] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState({});
  const [status, setStatus] = useState(["Not Process", "Preparing", "Ready"]);
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
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/order/all-orders`
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

  const handleBuyer = (buyer) => {
    setSelectedBuyer(buyer);
    setShowBuyer(true);
  };

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/order/order-status/${orderId}`,
        {
          status: value,
        }
      );
      toast.success("Order Status updated successfully");
      getAllOrders();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const renderTable = () => {
    let view = [];
    orders?.map((item, i) => {
      view.push(
        <tr key={item._id}>
          <td className="px-6 py-4">{i + 1}</td>
          <td>
            <select
              onChange={(event) => handleChange(item._id, event.target.value)}
              className={
                item?.status === "Ready"
                  ? "bg-green-50 px-2 py-1 text-xs cursor-pointer font-semibold text-green-600"
                  : item?.status === "Preparing"
                  ? "bg-yellow-50 px-2 py-1 text-xs cursor-pointer font-semibold text-yellow-600"
                  : "bg-red-50 px-2 py-1 text-xs cursor-pointer font-semibold text-red-600"
              }
              defaultValue={item?.status}
            >
              {status.map((s, i) => (
                <option
                  key={i}
                  value={s}
                  className={
                    s === "Ready"
                      ? "bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                      : s === "Preparing"
                      ? "bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600"
                      : "bg-red-50 px-2 py-1 text-xs font-semibold text-red-600"
                  }
                >
                  {s}
                </option>
              ))}
            </select>
          </td>
          {/* <td className="px-6 py-4 hidden md:block">
            <Select
              bordered={false}
              onChange={(value) => handleChange(item._id, value)}
              defaultValue={item?.status}
            >
              {status.map((s, i) => (
                <Option key={i} value={s}>
                  {s}
                </Option>
              ))}
            </Select>
          </td> */}
          {/* <td className="px-6 py-4">{item?.buyer?.name}</td> */}
          <td className="px-6 py-4">
            <button
              onClick={() => handleBuyer(item?.buyer)}
              className="bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
            >{item?.buyer?.name}</button>
          </td>
          <td className="px-6 py-4">{moment(item?.createdAt).fromNow()}</td>
          <td className="px-6 py-4">{item?.payment} $</td>
          <td className="px-6 py-4">
            <AiOutlineEye
              onClick={() => handleProducts(item?.products)}
              className="h-6 w-6 hover:text-blue-600 cursor-pointer"
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
      {showBuyer && <Buyer selectedBuyer={selectedBuyer} setShowBuyer={setShowBuyer} />}

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

export default AdminOrder;
