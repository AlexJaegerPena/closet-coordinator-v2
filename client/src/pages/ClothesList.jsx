import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import the Icons

const categories = [
  {
    id: 1,
    name: "Jackets",
    image: "https://img01.ztat.net/article/spp-media-p1/c64bdecbf99a460fa2804aab18f2ea86/74131e965bc64dc4aedb3a671fa0e7c0.jpg?imwidth=1800&filter=packshot",
  },
  {
    id: 2,
    name: "Sweaters",
    image: "https://img01.ztat.net/article/spp-media-p1/6df2072f78b041129f50d37a59b1faf6/d457f7b794454b8ea3aa79b04e9e5564.jpg?imwidth=1800&filter=packshot",
  },
  {
    id: 3,
    name: "Shirts",
    image: "https://img01.ztat.net/article/spp-media-p1/e9fdf4f0bc5248e6855e87c247cce063/4d96b8baf2be4e38a9113d22ff4c9ec3.jpg?imwidth=1800&filter=packshot",
  },
  {
    id: 4,
    name: "Pants",
    image: "https://img01.ztat.net/article/spp-media-p1/637562911a7e36c28ce77c9db69b4cef/00373c35a7f94b4b84a4e070879289a2.jpg?imwidth=1800",
  },
  {
    id: 5,
    name: "Shoes",
    image: "https://img01.ztat.net/article/spp-media-p1/b8cd4c4adeb3319fb6b4e3c0deabde0b/cf6b6464162b4aafb83a7ac50e3cae68.jpg?imwidth=1800&filter=packshot",
  },
  {
    id: 6,
    name: "Accessories",
    image: "https://img01.ztat.net/article/spp-media-p1/50ca52f0675d48c5af8f19394808cc55/8e2e171a77604d7b8487d907a8f869f2.jpg?imwidth=1800&filter=packshot",
  },
];

const ClothesList = () => {
  const [visibleCategories, setVisibleCategories] = useState(categories);
  const [hoveredCategory, setHoveredCategory] = useState();

  const handleCategoryClick = (category) => {
    setHoveredCategory(category);
  };

  const handleEditClick = (event, category) => {
    event.stopPropagation(); // Prevent triggering the parent element's onClick event
    alert(`Edit ${category.name}`);
  };

  // Remove category image when delete button is clicked
  const handleDeleteClick = (categoryId) => {
    setVisibleCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
    console.log("Deleted category with ID: ", categoryId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* List of categories */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 ${
              hoveredCategory === category ? "bg-gray-300" : ""
            }`}
          >
            <span className="text-lg font-semibold">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Display images of categories */}
      <div className="flex flex-wrap justify-center gap-4">
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            className="relative w-40 h-40 bg-gray-200 border rounded-3xl overflow-hidden flex items-center justify-center"
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {hoveredCategory === category && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(event) => handleEditClick(event, category)}
                  className="text-white"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteClick(category.id)}
                  className="text-white bg-red-500 p-2 rounded-full hover:bg-red-700 focus:outline-none"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothesList;
