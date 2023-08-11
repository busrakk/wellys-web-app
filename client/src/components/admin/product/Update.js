import React, { useState, useEffect } from "react";
import { Select } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
const { Option } = Select;

const Update = (props) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories();
  }, []);
  // get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/category/get-category`
      );
      if (data.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="fixed z-0 inset-x-0 top-14 bottom-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center overflow-y-scroll">
      <div className="p-2 rounded">
        <div className="flex justify-center">
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-3/4">
            {props.isLoading === true ? (
              <div className="bg-white px-6 py-4">Loading</div>
            ) : (
              <form
                onSubmit={props.handleSubmit}
                encType="multipart/form-data"
                className="bg-white px-6 py-4 overflow-auto"
              >
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="category"
                    className="mb-1 text-fontxs sm:text-fontsm tracking-wide text-gray-600"
                  >
                    Ürün Kategorisi:
                  </label>
                  <Select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    onChange={(value) => {
                      props.setCategory(value);
                    }}
                    value={props.category}
                    className="text-fontxs sm:text-fontsm placeholder-gray-500 rounded-lg w-full py-2 focus:outline-none focus:border-indigo-400"
                  >
                    {categories?.map((item) =>
                      item?.status === "1" ? (
                        <Option key={item._id} value={item?._id}>
                          {item?.name}
                        </Option>
                      ) : null
                    )}
                  </Select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 space-x-4">
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor="name"
                      className="mb-1 text-fontxs sm:text-fontsm tracking-wide text-gray-600"
                    >
                      Ürün Adı:
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="text-fontxs sm:text-fontsm placeholder-gray-500 pl-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-indigo-400"
                      placeholder="Ürün Adı"
                      onChange={(e) => props.setName(e.target.value)}
                      value={props.name}
                      name="name"
                      required
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor="price"
                      className="mb-1 text-fontxs sm:text-fontsm tracking-wide text-gray-600"
                    >
                      Ürün Fiyatı:
                    </label>
                    <input
                      id="price"
                      type="number"
                      className="text-fontxs sm:text-fontsm placeholder-gray-500 pl-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-indigo-400"
                      placeholder="Ürün Fiyatı"
                      onChange={(e) => props.setPrice(e.target.value)}
                      value={props.price}
                      name="price"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="description"
                    className="mb-1 text-fontxs sm:text-fontsm tracking-wide text-gray-600"
                  >
                    Ürün Tanımı:
                  </label>
                  <textarea
                    id="description"
                    type="text"
                    className="text-fontxs sm:text-fontsm placeholder-gray-500 pl-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-indigo-400"
                    placeholder="Ürün Tanımı"
                    onChange={(e) => props.setDescription(e.target.value)}
                    value={props.description}
                    name="description"
                  ></textarea>
                </div>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="upload images"
                    className="mb-1 text-fontxs sm:text-fontsm tracking-wide text-gray-600"
                  >
                    {props.photo ? props.photo.name : "Upload Photo :"}
                  </label>
                  <input
                    type="file"
                    className="text-fontxs sm:text-fontsm placeholder-gray-500 pl-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-indigo-400"
                    placeholder="Ürün Resmi"
                    value={props.image}
                    name="photo"
                    accept="image/*"
                    onChange={(e) => props.setPhoto(e.target.files[0])}
                    //hidden
                  />
                </div>
                <div className="flex flex-col mb-4">
                  {props.photo ? (
                    <div className="flex justify-center items-center">
                      <img
                        src={URL.createObjectURL(props.photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="w-28 h-28"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      <img
                        src={`${process.env.REACT_APP_BACKEND_ROOT_URL}/api/product/product-photo/${props?.productId}`}
                        alt="product_photo"
                        height={"200px"}
                        className="w-28 h-28"
                      />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 space-x-4">
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor="featured"
                      className="mb-1 text-fontxs sm:text-fontsm tracking-wide text-gray-600"
                    >
                      Öne Çıkarma:
                    </label>
                    <select
                      id="featured"
                      name="featured"
                      onChange={(e) => props.setFeatured(e.target.value)}
                      value={props.featured}
                      className="text-fontxs sm:text-fontsm placeholder-gray-500 pl-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-indigo-400"
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor="status"
                      className="mb-1 text-fontxs sm:text-fontsm tracking-wide text-gray-600"
                    >
                      Durum:
                    </label>
                    <select
                      id="status"
                      name="status"
                      onChange={(e) => props.setStatus(e.target.value)}
                      value={props.status}
                      className="text-fontxs sm:text-fontsm placeholder-gray-500 pl-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-indigo-400"
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => props.setShow(false)} // Close the form
                    className="mr-2 px-4 py-2 text-fontsm font-medium tracking-wide text-gray-600 capitalize transition-colors duration-300 transform bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-fontsm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-violet-600 rounded-lg md:text-fontmd hover:bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300 focus:ring-opacity-80"
                  >
                    {props.button}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
