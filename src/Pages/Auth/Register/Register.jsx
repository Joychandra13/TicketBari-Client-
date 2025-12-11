import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import GoogleLogIn from "../GoogleLogIn/GoogleLogIn";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { auth } from "../../../firebase/firebase.init";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile, setUser } = useAuth();

  const handleRegister = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log("User created:", result.user);

        // Upload image
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_Key
        }`;

        axios
          .post(image_API_URL, formData)
          .then((res) => {
            const imageURL = res.data.data.url;
            console.log("Image uploaded:", imageURL);


            // create user in the database
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photoURL,
            };
            axiosSecure.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                console.log("user created in the database");
              }
            });

            
            const userProfile = {
              displayName: data.name,
              photoURL: imageURL,
            };

            // Update Firebase profile
            updateUserProfile(userProfile)
              .then(() => {
                // Force reload Firebase user
                auth.currentUser.reload().then(() => {
                  // Update Context instantly
                  setUser({
                    ...auth.currentUser,
                    displayName: data.name,
                    photoURL: imageURL,
                  });

                  // Navigate home
                  navigate(location.state || "/");
                });
              })
              .catch((error) => console.log("Profile update error:", error));
          })
          .catch((error) => console.log("Image upload error:", error));
      })
      .catch((error) => console.log("Register error:", error));
  };

  return (
    <div className="mt-20 py-20 px-4">
      <h1 className="title text-center">Create a new Account</h1>
      <p className="subTitle text-center">
        Join us and book your tickets easily!
      </p>
      <div className="w-full max-w-md mx-auto card rounded-md shadow-sm shadow-gray-400 duration-300">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleRegister)} className="fieldset">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              {...register("name", { required: true })}
              className="input w-full"
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="text-red-500">
                Name is required!
              </p>
            )}
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
              type="file"
              className="file-input w-full text-gray-400"
              name="photo"
              placeholder="Your Photo"
              {...register("photo")}
            />

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
              Register
            </button>
          </form>
          <p className="text-center text-gray-400">Or</p>
          <GoogleLogIn />
          <p className="text-center text-sm mt-4 text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-secondary font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
