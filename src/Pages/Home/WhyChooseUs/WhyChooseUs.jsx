import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const WhyChooseUs = () => {
  return (
    <section className=" bg-gray-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto pt-10 pb-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {" "}
        <div className="order-2 md:order-1 flex-1">
          <h2 className="title">Why Choose TicketBari?</h2>
          <p className="subTitle">
            We make your travel booking easier, faster and more reliable.
          </p>

          <ul className="mt-6 space-y-3 text-gray-400">
            <li>• 100% secure digital payment</li>
            <li>• Live availability & instant confirmation</li>
            <li>• All transport types in one place</li>
            <li>• Customer support available 24/7</li>
          </ul>
        </div>
        {/* Right Image */}
        <div className="order-1 md:order-2 border border-gray-500 flex-1 bg-white">
          <DotLottieReact
            src="https://lottie.host/39ef3cda-785c-48e5-95e7-ef46ad901a4f/oT0wjIUF2K.lottie"
            loop
            autoplay
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
