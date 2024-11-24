import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { AuthContext } from "./App";
import LogoNav from "./assets/imgs/lg.jpg";
const Navbar = () => {
  const { user, setUser } = useContext(AuthContext); // Access user and setUser from context
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUser(null); // Clear user context
    localStorage.removeItem("authUser"); // Clear user from localStorage
    navigate("/signin", { replace: true }); // Redirect to Sign In page
  };
  return (
    <nav className="bg-cyan-500 text-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold flex align-middle gap-2 justify-center items-center">
          <img className="w-12 h-12  rounded-full" src={LogoNav} />
          <Link to="/">Jormor Shop</Link>
        </h1>
        <div className="flex items-center space-x-4">
          <Link to="/products" className="hover:underline">
            สินค้า
          </Link>
          {!user ? (
            <>
              <Link to="/signup" className="hover:underline">
                ลงทะเบียน
              </Link>
              <Link to="/signin" className="hover:underline">
                ลงชื่อเข้าใช้
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                <span>{user.displayName || user.email}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.094l3.71-3.86a.75.75 0 111.08 1.04l-4 4.17a.75.75 0 01-1.08 0l-4-4.17a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg z-10">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
