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
    <div className="p-4 relative">
      <FloatingButton
        onClick={() => setShowCategories(!showCategories)}
        isMenuOpen={showCategories}
      />

      <AnimatePresence>
        {showCategories && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-40"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <CategoryList
                onCategorySelect={handleCategorySelect}
                selectedCategory={selectedCategory}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedCategory && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {selectedCategory.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatePresence>
              {selectedCategory.items.map((item) => (
                <motion.div
                  key={item.name}
                  className="relative w-40 h-40 bg-gray-200 border rounded-3xl overflow-hidden flex items-center justify-center shadow-md"
                  onMouseEnter={() => setHoveredCategory(item)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {hoveredCategory === item && (
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        className="text-gray-400 rounded-full p-1"
                        onClick={() =>
                          document.getElementById("my_modal_4").showModal()
                        }>
                        <dialog
                          id="my_modal_4"
                          className="modal fixed inset-0 flex items-center justify-center p-4">
                          <div className="modal-box w-6/12 max-w-md bg-white rounded-lg shadow-lg p-4">
                            <h3 className="font-bold text-lg mb-4">
                              Update your item
                            </h3>
                            <ClothesFormPopup />
                            <div className="flex gap-4">
                              <button
                                className="btn flex-1"
                                onClick={() => alert("Update action")}>
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
                        className="text-gray-400 rounded-full p-1">
                        <FaTrash size={20} />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClothesList;
