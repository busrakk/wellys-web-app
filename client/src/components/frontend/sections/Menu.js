import React, { useEffect, useState } from "react";
import Menus from "../Menus";
import axios from "axios";
import { toast } from 'react-toastify';
//import { useAuth } from "../../../context/auth";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllProducts();
  }, []);

  // get all product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/product/product-featured`
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
  return (
    <div id="menu" className="mb-10 w-screen relative mt-8 py-14 bg-white">
      <div className="text-[48px] sm:text-[56px] md:text-[72px] font-satisfy capitalize flex justify-center items-center mx-auto bg-white">
        Menu
      </div>
      <div className="text-fontsm sm:text-fontmd font-medium uppercase flex justify-center items-center mx-auto text-gray-600 mb-6 mt-1">
        OUR MOST POPULAR MENU
      </div>
      <Menus products={products} isLoading={isLoading} />
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </div>
  );
};

export default Menu;
