import React, { useContext } from "react";
import { RiUserFollowFill } from "react-icons/ri";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, NavLink } from "react-router";
import Loading from "../Pages/Loading";
import logo from "/logo.png";
const Navbar = () => {
  const { user, logoutUser, loading } = useContext(AuthContext);
  const defaultAvatar =
    "https://img.freepik.com/free-vector/smiling-young-man-glasses_1308-174702.jpg";

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-[#0a472e] sticky top-0 z-50 shadow-sm font-roboto">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <div className="navbar-start">
          <div className="flex justify-center items-center text-white py-4">
            {/* Logo */}
            <img className="w-10 h-10" src={logo} alt="" />

            {/* Brand Name */}
            <Link to="/" className="text-2xl font-semibold">
              EcoFridge
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1 gap-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-[#a8b324] border-b-2"
                    : "text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/fridge"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-[#a8b324] border-b-2"
                    : "text-white "
                }
              >
                Fridge
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-[#a8b324] border-b-2"
                    : "text-white "
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-[#a8b324] border-b-2"
                    : "text-white "
                }
              >
                Faq
              </NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink
                    to="/addFood"
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold text-[#a8b324] border-b-2"
                        : "text-white"
                    }
                  >
                    Add Food
                  </NavLink>{" "}
                </li>

                <li>
                  <NavLink
                    to="/myItems"
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold text-[#a8b324] border-b-2"
                        : "text-white"
                    }
                  >
                    My Items
                  </NavLink>{" "}
                </li>
              </>
            )}
          </ul>
        </div>
        {/* Avatar for desktop */}
        <div className="hidden lg:flex navbar-end gap-6">
          {user ? (
            <>
              <div className="relative flex items-center gap-4">
                <div className="relative group">
                  <div className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 h-10 rounded-full bg-slate-400 overflow-hidden">
                      <img
                        className="p-1 rounded-full object-contain"
                        src={user?.photoURL ? user.photoURL : defaultAvatar}
                        alt={user?.displayName || "User Avatar"}
                      />
                    </div>
                  </div>

                  {/* Hover user name only */}
                  <div className="absolute right-0 mt-2 hidden group-hover:block z-10 bg-gray-700 text-white shadow-lg rounded px-4 py-2 whitespace-nowrap">
                    <p className="font-medium text-sm">
                      {user?.displayName || "User"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={logoutUser}
                  className="border border-[#a8b324] text-[#a8b324] hover:bg-[#a8b324] hover:text-[#0a472e] px-8 py-2 rounded-full"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="bg-[#a8b324] hover:bg-[#8ea019] text-[#0a472e] font-semibold px-8 py-2 rounded-full"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="border border-[#a8b324] text-[#a8b324] hover:bg-[#a8b324] hover:text-[#0a472e] px-8 py-2 rounded-full"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="flex lg:hidden navbar-end items-center gap-3 relative">
          {user ? (
            <>
              {/* Avatar with name on hover */}
              <div className="relative group">
                <div className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 h-10 rounded-full bg-slate-400 overflow-hidden">
                    <img
                      className="p-1 rounded-full object-contain"
                      src={user?.photoURL ? user.photoURL : defaultAvatar}
                      alt={user?.displayName || "User Avatar"}
                    />
                  </div>
                </div>

                {/* Hover user name only */}
                <div className="absolute right-0 mt-2 hidden group-hover:block z-10 bg-gray-700 text-white shadow-lg rounded px-4 py-2 whitespace-nowrap">
                  <p className="font-medium text-sm">
                    {user?.displayName || "User"}
                  </p>
                </div>
              </div>

              {/* Hamburger Dropdown */}
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost">
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
                  tabIndex={0}
                  className="menu menu-sm dropdown-content absolute right-0 mt-3.5 w-40 bg-white rounded-box p-2 shadow z-10"
                >
                  <li>
                    <Link to="/" className="text-[#0a472e]">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/fridge" className="text-[#0a472e]">
                      Fridge
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-[#0a472e]">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-[#0a472e]">
                      Faq
                    </Link>
                  </li>
                  <li>
                    <Link to="/addFood" className="text-[#0a472e]">
                      Add Food
                    </Link>
                  </li>
                  <li>
                    <Link to="/myItems" className="text-[#0a472e]">
                      My Items
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutUser}
                      className="text-[#0a472e] font-semibold"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost">
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
                tabIndex={0}
                className="menu menu-sm dropdown-content absolute right-0 mt-3.5 w-40 bg-white rounded-box p-2 shadow z-10"
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/fridge">Fridge</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/faq">Faq</Link>
                </li>
                <li>
                  <Link to="/auth/login">Login</Link>
                </li>
                <li>
                  <Link to="/auth/register">Register</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
