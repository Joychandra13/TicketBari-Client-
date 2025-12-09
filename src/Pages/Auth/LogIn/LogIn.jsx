import React from "react";
import { useForm } from "react-hook-form";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log("After LogIn", data);
  };

  return (
    <div className="mt-20 py-20 px-4 ">
      <h1 className="title text-center">Login to Your Account</h1>
      <p className="subTitle text-center">
        Welcome back! Please login to continue.
      </p>
      <div className=" w-full max-w-md mx-auto card rounded-md shadow-sm shadow-gray-400 duration-300">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)} className="fieldset">
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="input w-full"
            />
            {errors.email?.type === "required" && (
              <p role="alert" className="text-red-500">
                Email is required!
              </p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
              })}
              className="input w-full pr-10"
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="text-red-500">
                Password is required!
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p role="alert" className="text-red-500">
                Password must be at least 6 characters!
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p role="alert" className="text-red-500">
                Password must have an Uppercase and a Lowercase letter!
              </p>
            )}

            <button type="submit" className="fullWidthButton mt-2">
              LogIn
            </button>
          </form>
          <p className="text-center text-gray-400">Or</p>
          <button className="fullWidthButton">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Sign up with Google
          </button>
          <p className="text-center text-sm mt-4 text-gray-400">
            Don’t have an account?
            <a
              href="/register"
              className="ms-2 text-secondary font-semibold hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
