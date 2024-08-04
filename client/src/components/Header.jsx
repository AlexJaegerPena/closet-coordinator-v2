import React from "react";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  return (
    <div className="navbar bg-sky-600">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Logo</a>
      </div>
      <div className="flex-none align-center">
        <CgProfile className="btn btn-ghost w-20 text-2xl text-white" />
      </div>
    </div>
  );
};

export default Header;
