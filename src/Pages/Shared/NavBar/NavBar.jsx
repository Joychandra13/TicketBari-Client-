import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo";
import useAuth from "../../../hooks/useAuth";
import avatar from "../../../assets/avatar.png";

const NavBar = () => {

  const {user, logOutUser} = useAuth();
  const handleLogOut = ()=>{
        logOutUser()
        .then()
        .catch(error =>{
            console.log(error);
        })
    }

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "activeNav" : "text-gray-500")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-tickets"
          className={({ isActive }) => (isActive ? "activeNav" : "text-gray-500")}
        >
          All Tickets
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "activeNav" : "text-gray-500")}
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "activeNav" : "text-gray-500")}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          className={({ isActive }) => (isActive ? "activeNav" : "text-gray-500")}
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white text-gray-400 shadow-sm shadow-gray-400 fixed w-full top-0 z-50 ">
      <div className="navbar max-w-7xl mx-auto h-25">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar p-2 flex items-center gap-2 cursor-pointer">
                <div className="w-10 rounded-full border-2 border-gray-500-500">
                  <img
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || avatar}
                    alt="User Avatar"
                  />
                  
                </div>
                <p className="text-base font-bold text-gray-400">
                    {user?.displayName || "User"}
                  </p>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content rounded-md shadow-sm shadow-gray-400 hover:bg-gray-50 duration-300 bg-base-100 rounded-box z-10 mt-3 w-60 p-4 "
              >
                <li className="text-center">
                  <Link to='/dashboard'
                    className="button"
                  >
                    My Profile
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="button"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="button"
              >
                Login
              </NavLink>
            </>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default NavBar;
