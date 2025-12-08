import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

const OurMission = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Left Text */}
      <div className="order-2 md:order-1">
        <h2 className="title">Our Mission</h2>
        <p className="subTitle leading-relaxed">
          We aim to make travel easier for everyone by combining all types of
          transport ticket booking in one platform. From searching routes to
          instant booking confirmation — everything is handled in a few simple
          steps.
        </p>
        <p className="subTitle leading-relaxed">
          No more standing in long queues, no more confusion — find your route,
          compare prices, and book your trip anytime, anywhere.
        </p>
      </div>

      {/* Right Image */}
      <div className="flex-1 border border-gray-500 order-1 md:order-2">
        <DotLottieReact
          src="https://lottie.host/d8fc1e07-dfa7-4269-8b01-76cc24410052/9VzaHjDk2G.lottie"
          loop
          autoplay
          className="w-full"
        />
      </div>
    </section>
  );
};

export default OurMission;
