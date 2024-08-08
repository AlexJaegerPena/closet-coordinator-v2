import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Confetti from "react-confetti";

import "./Navbar.css";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleLogoClick = () => {
    setShowConfetti(true);
  };

  useEffect(() => {
    if (showConfetti) {
      const timeout = setTimeout(() => {
        setShowConfetti(false);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [showConfetti]);

  return (
    <div className="navbar sticky top-0 bg-white shadow-md z-50 flex items-center bg-gradient-to-r from-sky-600 to-teal-400 justify-between">
      <div className="flex items-center">
        <Link to="/" className="flex items-center" onClick={handleLogoClick}>
          <img
            src={logo}
            alt="Logo"
            className="btn btn-ghost btn-circle h-[40px]"
          />
          <span className="closet-coordinator ml-2 text-white font-semibold line-height-2">
            Closet Coordinator
          </span>
        </Link>
      </div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <label
          tabIndex={0}
          className="btn btn-ghost btn-circle"
          onClick={toggleDropdown}
        >
          <CgProfile className="profile-icon text-3xl" />
        </label>

        {isDropdownOpen && (
          <ul
            tabIndex={0}
            className="menu menu-m dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-24 "
          >
            <li>
              <Link to="/" className="justify-between">
                <span>Profile</span>
              </Link>
            </li>

            <li>

              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>

            </li>
          </ul>
        )}
      </div>
      {showConfetti && (
        <Confetti
          numberOfPieces={500}
          wind={0.02}
          gravity={0.3}
          recycle={false}
        />
      )}
    </div>
  );
};

export default Navbar;
