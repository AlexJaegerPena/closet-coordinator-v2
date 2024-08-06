import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ClothesFormPopup from "../components/ClothesFormPopup";
import { motion, AnimatePresence } from "framer-motion";
import CategoryList from "../components/CategoryList";
import FloatingButton from "../components/FloatingButton";

const ClothesList = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategories(false); // Hide categories when a category is selected
  };

  const handleDeleteClick = (event, item) => {
    event.stopPropagation();
    console.log(`Delete ${item.name}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-rows-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition ${
              selectedCategory === category ? "bg-gray-300" : ""
            }`}
          >
            <span className="text-lg font-semibold">{category.name}</span>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {selectedCategory.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {selectedCategory.items.map((item) => (
              <li
                key={item.name}
                className="relative w-40 h-40 bg-gray-200 border rounded-3xl overflow-hidden flex items-center justify-center shadow-md"
                onMouseEnter={() => setHoveredCategory(item)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className={`absolute inset-0 w-full h-full object-cover `}
                />
                {hoveredCategory === item && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      className="text-grey-400 rounded-full p-1"
                      // onClick={(event) => handleEditClick(event, item)}
                      onClick={() =>
                        document.getElementById("my_modal_4").showModal()
                      }
                    >
                      <dialog
                        id="my_modal_4"
                        className="modal fixed inset-0 flex items-center justify-center p-4"
                      >
                        <div className="modal-box w-6/12 max-w-md bg-white rounded-lg shadow-lg p-4">
                          <h3 className="font-bold text-lg mb-4">
                            Update your item
                          </h3>
                          <ClothesFormPopup />
                          <div className="flex gap-4">
                            <button
                              className="btn flex-1"
                              onClick={() => alert("Update action")}
                            >
                              Update
                            </button>
                            <form method="dialog" className="flex-1">
                              <button className="btn w-full">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>

                      <FaEdit size={20} />
                    </button>

                    <button
                      onClick={(event) => handleDeleteClick(event, item)}
                      className="text-grey-400 rounded-full p-1"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClothesList;
