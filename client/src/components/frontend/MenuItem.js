import React from "react";
import { BiCartAlt } from "react-icons/bi";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    //console.log(item)
    dispatch(addProduct({ ...item, quantity: 1 }));
    toast.success(`${item.name} successfully added to cart`);
  };

  return (
    <div key={item._id} className="md:px-4 px-10">
      <div className="w-full max-w-sm overflow-hidden rounded-lg shadow-md">
        <img
          className="object-cover w-full h-64 rounded-t-md"
          src={`${process.env.REACT_APP_BACKEND_ROOT_URL}/api/product/product-photo/${item._id}`}
          alt={item.name}
        />

        <div className="p-2 sm:p-4">
          <p className="flex font-bold items-center justify-center text-gray-700 text-fontlg leading-7 mb-1 text-2xl">
            {item.name}
          </p>
          <p className="text-[#7C7C80] pl-4 font-[15px] text-fontsm mt-2 overflow-hidden max-h-[2em]">
            {item.description}
          </p>
          <div className="mt-4 mb-2 flex justify-between pl-4 pr-2">
            <button className="block text-fontlg font-semibold text-gray-700 cursor-auto">
              $ {item.price}
            </button>
            <button
              onClick={handleClick}
              className="text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md hover:bg-green-500 hover:scale-105 transition-all transform duration-500"
            >
              <BiCartAlt size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
