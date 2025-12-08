import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

const Vision = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Left Image */}
      <div className="border border-gray-500">
        <DotLottieReact
          src="https://lottie.host/6e797189-5e1d-4924-92ee-edee7ea3f4bb/KgF5yEUiO1.lottie"
          loop
          autoplay
        />
      </div>

      {/* Right Text */}
      <div className="">
        <h2 className="title">Our Vision</h2>
        <p className="subTitle leading-relaxed ">
          We dream of a future where every Bangladeshi traveler can access any
          transportation service digitally without worry or delay.
        </p>
        <p className="subTitle leading-relaxed">
          TicketBari is constantly improving to ensure better service, better
          pricing, and better travel experiences for all users.
        </p>
      </div>
    </section>
  );
};

export default Vision;
