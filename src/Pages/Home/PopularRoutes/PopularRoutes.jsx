import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const PopularRoutesSection = () => {
  return (
    <section className=" bg-gray-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto pt-20 pb-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"> 
        {/* Left Image */}
        <div className="flex-1 border border-gray-500 bg-white">
          <DotLottieReact
            src="https://lottie.host/dab17b44-2a30-4fe4-bce3-e21b40562eab/rQGLn92CoK.lottie"
            loop
            autoplay
            className="w-full"
          />
        </div>

        {/* Right Text */}
        <div className="flex-1 ">
          <h2 className="title">Popular Travel Routes</h2>
          <p className="subTitle">
            Most travelled and highly demanding routes every single day.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 text-gray-400">
            <p>Dhaka → Chittagong</p>
            <p>Dhaka → Sylhet</p>
            <p>Dhaka → Cox’s Bazar</p>
            <p>Dhaka → Rajshahi</p>
            <p>Dhaka → Barisal</p>
            <p>Dhaka → Khulna</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularRoutesSection;
