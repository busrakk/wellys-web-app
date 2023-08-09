import Carousel from "../Carousel";

const Slider = () => {
  return (
    <div id="home" className="w-screen relative bg-[#fff]">
      <div className="w-full mx-auto flex justify-center items-center">
        <div className="w-full h-full">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Slider;
