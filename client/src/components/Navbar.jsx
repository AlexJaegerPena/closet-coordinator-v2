import { useState } from "react";
// import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="nav-bar navbar sticky top-0 bg-white shadow-md z-50 flex items-center bg-gradient-to-r from-sky-600 to-teal-400">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt=""
            className="btn btn-ghost btn-circle h-[40px]"
          />
          <span className="closet-coordinator ml-2 text-white font-semibold line-height-2">
            Closet Coordinator
          </span>
        </Link>
      </div>
      <div className="doc flex items-center">
        <Link to="/" className="flex space-x-1 items-center"></Link>
      </div>
    </div>
  );
};

export default Navbar;
