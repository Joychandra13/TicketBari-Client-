import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import GoogleLogIn from "../GoogleLogIn/GoogleLogIn";
import { useLocation, useNavigate } from "react-router";

const LogIn = () => {
const navigate = useNavigate();
const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    console.log("After LogIn", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || '/')
      })
      .catch((error) => {
        console.log(error);
      });
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
          <GoogleLogIn />
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
