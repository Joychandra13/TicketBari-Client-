import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import GoogleLogIn from "../GoogleLogIn/GoogleLogIn";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxios();
  const { signInUser, resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
        axiosSecure.post("/users", userInfo).then(() => {
          navigate(location.state || "/");
        });
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  // Forgot password handler with Swal
  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Enter your email",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
    });

    if (email) {
      try {
        await resetPassword(email); // your Firebase password reset function
        Swal.fire(
          "Success",
          `Password reset email sent to ${email}! Check your inbox.`,
          "success"
        );
      } catch (err) {
        console.error(err);
        Swal.fire(
          "Error",
          "Failed to send reset email. Please try again.",
          "error"
        );
      }
    }
  };

  return (
    <div className="mt-20 py-20 px-4">
      <h1 className="title text-center">Login to Your Account</h1>
      <p className="subTitle text-center">
        Welcome back! Please login to continue.
      </p>

      <div className="w-full max-w-md mx-auto card rounded-md shadow-sm shadow-gray-400 duration-300">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)} className="fieldset">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="input w-full"
            />
            {errors.email && <p className="text-red-500">Email is required!</p>}

            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
              })}
              className="input w-full pr-10"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required!</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be at least 6 characters!
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must have an Uppercase and a Lowercase letter!
              </p>
            )}
            {/* Forgot Password */}
            <p
              className="text-sm mt-2 text-blue-600 cursor-pointer hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </p>

            <button type="submit" className="fullWidthButton mt-2">
              LogIn
            </button>
          </form>

          <p className="text-center text-gray-400 my-2">Or</p>
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
