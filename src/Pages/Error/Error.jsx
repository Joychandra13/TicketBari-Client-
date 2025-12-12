import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="min-h-screen max-w-3xl mx-auto flex flex-col justify-center items-center">
      <DotLottieReact
      className="h-96"
        src="https://lottie.host/5755716b-8af5-4d94-bfe1-b88b542f8e63/dITZc2H2j7.lottie"
        loop
        autoplay
      />
      <Link to='/' className="button">Go Back Home</Link>
    </div>
  );
};

export default Error;
