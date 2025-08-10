import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi"; // 3 dots icon
import useUserAuth from "../lib/userAuth";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = useUserAuth((state) => state.token);
 const user = useUserAuth((state) => state.user);
  const [showDrop, setShowDrop] = useState(false);

  const logout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.reload(); 
  };

  return (
    <nav className="shadow-md" style={{ background: "#FFA500" }}>
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link
          to="/"
          className="font-bold text-lg"
          style={{ color: "#111", textDecoration: "none" }}
        >
          TypeGearUp
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/challenges"
            className="font-semibold hover:text-orange-700 transition"
            style={{ color: "#111", textDecoration: "none" }}
          >
            Challenges
          </Link>
          <Link
            to="/aboutus"
            className="font-semibold hover:text-orange-700 transition"
            style={{ color: "#111", textDecoration: "none" }}
          >
            About Us
          </Link>
          <Link
            to="/contactus"
            className="font-semibold hover:text-orange-700 transition"
            style={{ color: "#111", textDecoration: "none" }}
          >
            Contact Us
          </Link>

          {token ? (
            <div className="relative">
              <button
                onClick={() => setShowDrop(!showDrop)}
                className="font-bold px-4 py-2"
                style={{
                  backgroundColor: "#111",
                  color: "#FFD700",
                  borderRadius: "20px",
                  border: "none",
                  textDecoration: "none",
                }}
              >
                {user.name || "User"}
              </button>

              {showDrop && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20"
                  style={{ color: "#111" }}
                >
                  <Link
                    to="/stats"
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-decoration-none"
                    onClick={() => setShowDrop(false)}
                  >
                    Check Stats
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="font-bold px-4 py-2"
              style={{
                backgroundColor: "#111",
                color: "#FFD700",
                borderRadius: "20px",
                border: "none",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <HiDotsHorizontal className="text-2xl text-[#111]" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
  <div className="md:hidden flex flex-col items-start bg-[#FFA500] px-4 pb-4 space-y-3">
    <Link
      to="/challenges"
      className="font-semibold"
      style={{ color: "#111", textDecoration: "none" }}
      onClick={() => setMenuOpen(false)} // close menu on navigation
    >
      Challenges
    </Link>
    <Link
      to="/aboutus"
      className="font-semibold"
      style={{ color: "#111", textDecoration: "none" }}
      onClick={() => setMenuOpen(false)}
    >
      About Us
    </Link>
    <Link
      to="/contactus"
      className="font-semibold"
      style={{ color: "#111", textDecoration: "none" }}
      onClick={() => setMenuOpen(false)}
    >
      Contact Us
    </Link>

    {token ? (
      <div className="w-full">
        <button
          onClick={() => setShowDrop(!showDrop)}
          className="w-full text-left font-bold px-4 py-2"
          style={{
            backgroundColor: "#111",
            color: "#FFD700",
            borderRadius: "20px",
            border: "none",
            textDecoration: "none",
          }}
        >
          {user.name || "User"}
        </button>

        {showDrop && (
          <div
            className="mt-2 bg-white rounded-md shadow-lg"
            style={{ color: "#111" }}
          >
            <Link
              to="/stats"
              className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-decoration-none"
              
              onClick={() => {
                setShowDrop(false);
                setMenuOpen(false);
              }}
            >
              Check Stats
            </Link>
            <button
              onClick={() => {
                logout();
                setShowDrop(false);
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    ) : (
      <Link
        to="/login"
        className="font-bold px-4 py-2"
        style={{
          backgroundColor: "#111",
          color: "#FFD700",
          borderRadius: "20px",
          border: "none",
          textDecoration: "none",
        }}
        onClick={() => setMenuOpen(false)}
      >
        Login
      </Link>
    )}
  </div>
)}

    </nav>
  );
}

export default Header;
