import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { LuShirt } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import "./Footer.css";

const Footer = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar sticky bottom-0 bg-white shadow-md z-50 flex bg-gradient-to-r from-sky-600 to-teal-400 justify-between items-center p-2 px-4">
      <div className="btn btn-ghost btn-circle ">
        <Link to="/clothes-list" className="flex items-center">
          <LuShirt className="text-white text-3xl" />
        </Link>
      </div>
      <div className="btn btn-ghost btn-circle ">
        <Link to="/" className="flex items-center">
          <HiOutlineHome className="text-white text-3xl " />
        </Link>
      </div>
      <div className="flex-none gap-2">
        {/* Dropdown Container */}
        <div className="dropdown dropdown-top dropdown-end">
          {/* Trigger Button */}
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            onClick={toggleDropdown}
          >
            <CgProfile className="profile-icon text-3xl" />
          </label>
          {/* Dropdown Menu */}
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
                <Link to="/login">Logout</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
