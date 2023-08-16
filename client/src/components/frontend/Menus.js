import React from "react";
import Slider from "react-slick";
import { BiCartAlt } from "react-icons/bi";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function NextBtn({ className, style, onClick }) {
  return (
    <button
      className={`text-brand-color absolute top-1/2 -right-16 -translate-y-1/2`}
      onClick={onClick}
    >
      <IoIosArrowForward size={28} />
    </button>
  );
}

function PrevBtn({ className, style, onClick }) {
  return (
    <button
      className={`text-brand-color absolute top-1/2 -left-16 -translate-y-1/2`}
      onClick={onClick}
    >
      <IoIosArrowBack size={28} />
    </button>
  );
}

const Menus = (props) => {
  const renderTableData = () => {
    let view = [];
    props.products.map((item) => {
      view.push(
        <div key={item._id} className="md:px-4 px-10">
          <div className="w-full max-w-sm overflow-hidden rounded-lg shadow-md">
            <img
              className="object-cover w-full h-64 rounded-t-md"
              src={`${process.env.REACT_APP_BACKEND_ROOT_URL}/api/product/product-photo/${item._id}`}
              alt={item.name}
            />

            <div class="p-2 sm:p-4">
              <p class="flex font-bold items-center justify-center text-gray-700 text-[22px] leading-7 mb-1 text-2xl">
                {item.name}
              </p>
              <p class="text-[#7C7C80] pl-4 font-[15px] text-sm mt-2 overflow-hidden max-h-[2em]">
                {item.description}
              </p>
              <div class="mt-4 mb-2 flex justify-between pl-4 pr-2">
                <button class="block text-fontlg font-semibold text-gray-700 cursor-auto">
                  $ {item.price}
                </button>
                <button class="text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md hover:bg-green-500 hover:scale-105 transition-all transform duration-500">
                  <BiCartAlt size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
      return view;
    });
    if (view.length === 0) {
      return <div className="md:px-0 px-10">No data found!</div>;
    } else {
      return view;
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: "linear",
    arrows: true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="mx-auto xl:px-40 md:pt-2">
      <Slider
        className="md:-mx-2 flex justify-center items-center"
        {...settings}
      >
        {props.isLoading && <div>Loading</div>}
        {!props.isLoading && renderTableData()}
      </Slider>
    </div>
  );
};

export default Menus;
