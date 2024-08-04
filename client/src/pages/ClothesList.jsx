import React, { useState } from "react";
// import {
//   FaJacket,
//   FaSweater,
//   FaShirt,
//   FaPants,
//   FaShoePrints,
//   FaRegSmile,
// } from "react-icons/fa";

const categories = [
  {
    name: "Jackets",
    // icon: <FaJacket />,
    image:
      "https://img01.ztat.net/article/spp-media-p1/c64bdecbf99a460fa2804aab18f2ea86/74131e965bc64dc4aedb3a671fa0e7c0.jpg?imwidth=1800&filter=packshot",
  },
  {
    name: "Sweaters",
    // icon: <FaSweater />,
    image:
      "https://img01.ztat.net/article/spp-media-p1/6df2072f78b041129f50d37a59b1faf6/d457f7b794454b8ea3aa79b04e9e5564.jpg?imwidth=1800&filter=packshot",
  },
  {
    name: "Shirts",
    // icon: <FaShirt />,
    image:
      "https://img01.ztat.net/article/spp-media-p1/e9fdf4f0bc5248e6855e87c247cce063/4d96b8baf2be4e38a9113d22ff4c9ec3.jpg?imwidth=1800&filter=packshot",
  },
  {
    name: "Pants",
    // icon: <FaPants />,
    image:
      "https://img01.ztat.net/article/spp-media-p1/637562911a7e36c28ce77c9db69b4cef/00373c35a7f94b4b84a4e070879289a2.jpg?imwidth=1800",
  },
  {
    name: "Shoes",
    // icon: <FaShoePrints />,
    image:
      "https://img01.ztat.net/article/spp-media-p1/b8cd4c4adeb3319fb6b4e3c0deabde0b/cf6b6464162b4aafb83a7ac50e3cae68.jpg?imwidth=1800&filter=packshot",
  },
  {
    name: "Accessories",
    // icon: <FaRegSmile />,
    image:
      "https://img01.ztat.net/article/spp-media-p1/50ca52f0675d48c5af8f19394808cc55/8e2e171a77604d7b8487d907a8f869f2.jpg?imwidth=1800&filter=packshot",
  },
];

const ClothesList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleButtonClick(category)}
            className="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300"
          >
            <div className="text-3xl mb-2">{category.icon}</div>
            <span className="text-lg font-semibold">{category.name}</span>
          </button>
        ))}
      </div>
      {selectedCategory && (
        <div className="relative w-full h-64 bg-gray-200 border rounded-3xl overflow-hidden mb-8">
          <img
            src={selectedCategory.image}
            alt={selectedCategory.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-white text-2xl font-bold">
            {selectedCategory.name}
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative w-40 h-40 bg-gray-200 border rounded-3xl overflow-hidden flex items-center justify-center"
          >
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 text-white bg-gray-800 bg-opacity-50 px-2 py-1 rounded">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothesList;
