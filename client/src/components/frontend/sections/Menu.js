import React from "react";
import Menus from "../Menus";
//import { useAuth } from "../../../context/auth";

const Menu = () => {
  //const [auth, setAuth] = useAuth();
  return (
    <div id="menu" className="mb-10 w-screen relative mt-8 bg-white">
      <div className="text-[48px] sm:text-[56px] md:text-[72px] font-satisfy capitalize flex justify-center items-center mx-auto bg-white">
        Menu
      </div>
      <div className="text-fontsm sm:text-fontmd font-medium uppercase flex justify-center items-center mx-auto text-gray-600 mb-6 mt-1">
        OUR MOST POPULAR MENU
      </div>
      <Menus />
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </div>
  );
};

export default Menu;
