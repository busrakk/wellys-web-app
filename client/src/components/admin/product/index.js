import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";

const Product = () => {
  return (
    <div className="h-full ml-14 mt-20 mb-10 md:ml-64 fixed overflow-x:hidden overflow-y-scroll pb-24">
      <div className="mt-4 text-fontlg font-semibold flex justify-between md:mx-24 mx-10">
        <span>Yemekler</span>
        <button className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize bg-violet-600 rounded-lg md:text-fontmd text-fontsm hover:bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300 focus:ring-opacity-80">
          <MdAddCircleOutline size={28} className="w-5 h-5 mx-1" />
          <span className="mx-1">Ekle</span>
        </button>
      </div>

      <div className="md:mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-6 mb-5 gap-4">
        <div className=" px-4 pt-5 pb-4 overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl sm:my-4 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
          <div>
            <img
              className="object-cover w-full h-48 rounded-md"
              src="https://picsum.photos/200/300"
              alt=""
            />

            <div className="mt-4 text-center">
              <h3
                className="font-medium leading-6 text-gray-800 capitalize"
                id="modal-title"
              >
                name
              </h3>
            </div>
          </div>

          <div className="mt-5 sm:flex sm:items-center sm:-mx-2">
            <div
              //   className={`w-full flex justify-center px-1 py-1 text-sm font-medium tracking-wide  capitalize border rounded-full sm:w-1/2 sm:mx-2  focus:outline-none focus:ring  focus:ring-opacity-40 ${
              //     item.featured === 1
              //       ? " border-yellow-500 text-yellow-500"
              //       : " border-gray-500 text-gray-500"
              //   } `}

              className={`w-full flex justify-center px-1 py-1 text-sm font-medium tracking-wide  capitalize border rounded-full sm:w-1/2 sm:mx-2  focus:outline-none focus:ring  focus:ring-opacity-40  border-yellow-500 text-yellow-500"
                  `}

              // className={`w-full flex justify-center px-1 py-1 text-sm font-medium tracking-wide  capitalize border rounded-full sm:w-1/2 sm:mx-2  focus:outline-none focus:ring  focus:ring-opacity-40 ${
              //   item.featured === 1
              //     ? "focus:ring-gray-500 hover:text-gray-500 hover:border-gray-500 focus:text-gray-500  border-yellow-500 text-yellow-500"
              //     : "focus:ring-yellow-500 hover:text-yellow-500 hover:border-yellow-500 focus:text-yellow-500  border-gray-500 text-gray-500"
              // } `}
            >
              <AiOutlineStar size={32} />
            </div>

            <button className="w-full px-2 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
              Düzenle
            </button>

            <button className="w-full px-2 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize bg-red-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40">
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
