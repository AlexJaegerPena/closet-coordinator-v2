import React from "react";
import Wardrobe from "../components/Wardrobe";

const Home = ({loginName}) => {
  return (
    <div>
      <div className="flex flex-col items-center space-y-2 pt-2 -mb-4">
        <span className="text-2xl font-semibold text-gray-700">Hi, {loginName}</span>
      </div>
      <Wardrobe />
    </div>
  );
};

export default Home;
