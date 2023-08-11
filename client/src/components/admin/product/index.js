import React, { useState, useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import Form from "./Form";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [featured, setFeatured] = useState("0");
  const [status, setStatus] = useState("1");
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  // get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/category/get-category`
      );
      if (data.success) {
        setIsLoading(false);
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // get all category
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/product/get-product`
      );
      if (data?.success) {
        setIsLoading(false);
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //create product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("featured", featured);
      productData.append("status", status);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/product/create-product`,
        productData
      );
      if (data?.success) {
        setShow(false);
        toast.success(`${name} is successfully created`);
        resetForm();
        getAllProducts();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  const resetForm = () => {
    setName("");
    setStatus("");
    setCategories("");
    setDescription("");
    setFeatured("");
    setPhoto("");
    setPrice("");
  };

  const renderTableData = () => {
    let view = [];
    products.map((item) => {
      view.push(
        <div
          key={item._id}
          className=" px-4 pt-5 pb-4 overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl sm:my-4 sm:align-middle sm:max-w-md sm:w-full sm:p-6"
        >
          <div>
            <img
              className="object-cover w-full h-full rounded-md"
              src={`${process.env.REACT_APP_BACKEND_ROOT_URL}/api/product/product-photo/${item._id}`}
              alt={item.name}
            />

            <div className="mt-4 text-center">
              <h3
                className="font-medium leading-6 text-gray-800 capitalize"
                id="modal-title"
              >
                {item.name}
              </h3>
            </div>
          </div>

          <div className="mt-5 sm:flex sm:items-center sm:-mx-2">
            <div
              className={`w-full flex justify-center px-1 py-1 text-sm font-medium tracking-wide  capitalize border rounded-full sm:w-1/2 sm:mx-2  focus:outline-none focus:ring  focus:ring-opacity-40 ${
                item.featured === "1"
                  ? " border-yellow-500 text-yellow-500"
                  : " border-gray-500 text-gray-500"
              } `}
            >
              <AiOutlineStar size={32} />
            </div>

            <button
              //onClick={() => handleModal(true, item.id)}
              className="w-full px-2 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            >
              Düzenle
            </button>

            <button
              //onClick={(e) => handleDelete(e, item.id)}
              className="w-full px-2 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize bg-red-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40"
            >
              Sil
            </button>
          </div>
        </div>
      );
      return view;
    });
    if (view.length === 0) {
      return <div>No data found!</div>;
    } else {
      return view;
    }
  };

  return (
    <div className="h-full ml-14 mt-20 mb-10 md:ml-64 fixed overflow-x:hidden overflow-y-scroll pb-24 w-4/5">
      <div className="mt-4 text-fontlg font-semibold flex justify-between md:mx-24 mx-10">
        <span>Yemekler</span>
        <button
          onClick={() => setShow(true)}
          className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize bg-violet-600 rounded-lg md:text-fontmd text-fontsm hover:bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300 focus:ring-opacity-80"
        >
          <MdAddCircleOutline size={28} className="w-5 h-5 mx-1" />
          <span className="mx-1">Ekle</span>
        </button>
      </div>

      {show && (
        <Form
          setShow={setShow}
          categories={categories}
          setCategory={setCategory}
          photo={photo}
          setPhoto={setPhoto}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          status={status}
          setStatus={setStatus}
          featured={featured}
          setFeatured={setFeatured}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          button="Ekle"
        />
      )}

      <div className="md:mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-6 mb-5 gap-4">
        {isLoading && <div>Loading</div>}
        {!isLoading && renderTableData()}
      </div>
    </div>
  );
};

export default Product;
