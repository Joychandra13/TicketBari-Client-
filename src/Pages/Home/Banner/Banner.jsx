import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Banner = () => {
  const bannerData = [
    {
      id: 1,
      title: "Book Your Journey, Anytime. Anywhere.",
      subtitle:
        "Bus, train, launch, and flight tickets — all in one platform. Enjoy hassle-free booking, instant confirmation, and secure payments for all your travels.",
      lottieUrl:
        "https://lottie.host/3d00044d-cd9c-4610-ae46-247ce19001d9/6zsbDVucn3.lottie",
      buttonText: "Search Tickets",
      buttonLink: "/all-tickets",
    },
    {
      id: 2,
      title: "Start Your Next Adventure with One Click",
      subtitle:
        "Discover routes, compare prices, and book instantly. Find the best deals across buses, trains, launches, and flights throughout Bangladesh without any hassle.",
      lottieUrl:
        "https://lottie.host/16d20b3f-eca9-429e-aa17-4d1cc945c6da/wtwbLzlMv6.lottie",
      buttonText: "Browse Now",
      buttonLink: "/all-tickets",
    },
    {
      id: 3,
      title: "Travel Smarter, Book Faster",
      subtitle:
        "Book the best travel tickets across Bangladesh with ease. Get real-time availability, secure payments, and instant e-tickets for your journey.",
      lottieUrl:
        "https://lottie.host/752f581d-ac6b-4afd-9220-210d1b307bd2/xXcWA9ldxX.lottie",
      buttonText: "Get Started",
      buttonLink: "/register",
    },
  ];

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      interval={3500}
    >
      {bannerData.map((item) => (
        <div
          key={item.id}
          className=" bg-gray-50  flex items-center mt-20 min-h-[766px] dark:bg-neutral-950 dark:shadow-black md:min-h-[750px] lg:min-h-[450px]"
        >
          <div className="flex flex-col-reverse lg:flex-row items-center px-6 lg:px-16 xl:px-0 py-20 gap-6 max-w-7xl mx-auto">
            {/* Left Side - Text */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="title">{item.title}</h2>
              <p className="subTitle">{item.subtitle}</p>

              <a href={item.buttonLink} className="button">
                {item.buttonText}
              </a>
            </div>

            {/* Right Side - Image */}
            <div className="flex-1 flex justify-center border border-gray-400 bg-white">
              {item.lottieUrl ? (
                <DotLottieReact
                  src={item.lottieUrl}
                  loop
                  autoplay
                  className=" h-80" // fixed height to prevent buffer issues
                />
              ) : (
                <div className="h-80 bg-gray-100 flex items-center justify-center">
                  Animation not available
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
