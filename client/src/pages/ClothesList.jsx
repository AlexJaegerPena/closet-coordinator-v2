import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import ClothesFormPopup from "../components/ClothesFormPopup";

const categories = [
  {
    id: 1,
    name: "Jackets",

    image:
      "https://img01.ztat.net/article/spp-media-p1/c64bdecbf99a460fa2804aab18f2ea86/74131e965bc64dc4aedb3a671fa0e7c0.jpg?imwidth=1800&filter=packshot",
    items: [
      {
        name: "Leather Jacket",
        image:
          "https://img01.ztat.net/article/spp-media-p1/c64bdecbf99a460fa2804aab18f2ea86/74131e965bc64dc4aedb3a671fa0e7c0.jpg?imwidth=300",
      },
      {
        name: "Denim Jacket",
        image:
          "https://img01.ztat.net/article/spp-media-p1/637562911a7e36c28ce77c9db69b4cef/00373c35a7f94b4b84a4e070879289a2.jpg?imwidth=300",
      },
    ],

    image:
      "https://img01.ztat.net/article/spp-media-p1/c64bdecbf99a460fa2804aab18f2ea86/74131e965bc64dc4aedb3a671fa0e7c0.jpg?imwidth=1800&filter=packshot",
  },
  {
    id: 2,
    name: "Sweaters",

    image:
      "https://img01.ztat.net/article/spp-media-p1/6df2072f78b041129f50d37a59b1faf6/d457f7b794454b8ea3aa79b04e9e5564.jpg?imwidth=1800&filter=packshot",
    items: [
      {
        name: "Wool Sweater",
        image:
          "https://img01.ztat.net/article/spp-media-p1/6df2072f78b041129f50d37a59b1faf6/d457f7b794454b8ea3aa79b04e9e5564.jpg?imwidth=300",
      },
      {
        name: "Cashmere Sweater",
        image:
          "https://img01.ztat.net/article/spp-media-p1/637562911a7e36c28ce77c9db69b4cef/00373c35a7f94b4b84a4e070879289a2.jpg?imwidth=300",
      },
    ],

    image:
      "https://img01.ztat.net/article/spp-media-p1/6df2072f78b041129f50d37a59b1faf6/d457f7b794454b8ea3aa79b04e9e5564.jpg?imwidth=1800&filter=packshot",
  },
  {
    id: 3,
    name: "Shirts",

    image:
      "https://img01.ztat.net/article/spp-media-p1/e9fdf4f0bc5248e6855e87c247cce063/4d96b8baf2be4e38a9113d22ff4c9ec3.jpg?imwidth=1800&filter=packshot",
    items: [
      {
        name: "Casual Shirt",
        image:
          "https://img01.ztat.net/article/spp-media-p1/e9fdf4f0bc5248e6855e87c247cce063/4d96b8baf2be4e38a9113d22ff4c9ec3.jpg?imwidth=300",
      },
      {
        name: "Formal Shirt",
        image:
          "https://img01.ztat.net/article/spp-media-p1/637562911a7e36c28ce77c9db69b4cef/00373c35a7f94b4b84a4e070879289a2.jpg?imwidth=300",
      },
    ],

    image:
      "https://img01.ztat.net/article/spp-media-p1/e9fdf4f0bc5248e6855e87c247cce063/4d96b8baf2be4e38a9113d22ff4c9ec3.jpg?imwidth=1800&filter=packshot",
  },
  {
    id: 4,
    name: "Pants",

    image:
      "https://img01.ztat.net/article/spp-media-p1/637562911a7e36c28ce77c9db69b4cef/00373c35a7f94b4b84a4e070879289a2.jpg?imwidth=1800",
    items: [
      {
        name: "Jeans",
        image:
          "https://img01.ztat.net/article/spp-media-p1/637562911a7e36c28ce77c9db69b4cef/00373c35a7f94b4b84a4e070879289a2.jpg?imwidth=300",
      },
      {
        name: "Chinos",
        image:
          "https://img01.ztat.net/article/spp-media-p1/637562911a7e36c28ce77c9db69b4cef/00373c35a7f94b4b84a4e070879289a2.jpg?imwidth=300",
      },
    ],

    image:
      "https://img01.ztat.net/article/spp-media-p1/637562911a7e36c28ce77c9db69b4cef/00373c35a7f94b4b84a4e070879289a2.jpg?imwidth=1800",
  },
  {
    id: 5,
    name: "Shoes",

    image:
      "https://img01.ztat.net/article/spp-media-p1/b8cd4c4adeb3319fb6b4e3c0deabde0b/cf6b6464162b4aafb83a7ac50e3cae68.jpg?imwidth=1800&filter=packshot",
    items: [
      {
        name: "Sneakers",
        image:
          "https://img01.ztat.net/article/spp-media-p1/b8cd4c4adeb3319fb6b4e3c0deabde0b/cf6b6464162b4aafb83a7ac50e3cae68.jpg?imwidth=300",
      },
      {
        name: "Boots",
        image:
          "https://img01.ztat.net/article/spp-media-p1/637562911a7e36c28ce77c9db69b4cef/00373c35a7f94b4b84a4e070879289a2.jpg?imwidth=300",
      },
    ],

    image:
      "https://img01.ztat.net/article/spp-media-p1/b8cd4c4adeb3319fb6b4e3c0deabde0b/cf6b6464162b4aafb83a7ac50e3cae68.jpg?imwidth=1800&filter=packshot",
  },
  {
    id: 6,
    name: "Accessories",

    image:
      "https://img01.ztat.net/article/spp-media-p1/50ca52f0675d48c5af8f19394808cc55/8e2e171a77604d7b8487d907a8f869f2.jpg?imwidth=1800&filter=packshot",
    items: [
      {
        name: "Belt",
        image:
          "https://img01.ztat.net/article/spp-media-p1/50ca52f0675d48c5af8f19394808cc55/8e2e171a77604d7b8487d907a8f869f2.jpg?imwidth=300",
      },
      {
        name: "Hat",
        image:
          "https://img01.ztat.net/article/spp-media-p1/637562911a7e36c28ce77c9db69b4cef/00373c35a7f94b4b84a4e070879289a2.jpg?imwidth=300",
      },
    ],

    image:
      "https://img01.ztat.net/article/spp-media-p1/50ca52f0675d48c5af8f19394808cc55/8e2e171a77604d7b8487d907a8f869f2.jpg?imwidth=1800&filter=packshot",
  },
];

const ClothesList = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleCategories, setVisibleCategories] = useState(categories);

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleEditClick = (event, item) => {
    event.stopPropagation(); // Prevents triggering parent onClick
    alert(`Edit ${item.name}`);
  };

  // Entferne ein Item aus der ausgewählten Kategorie
  const handleDeleteClick = (event, item) => {
    event.stopPropagation(); // Verhindert das Auslösen des Eltern onClick
    setSelectedCategory((prevCategory) => {
      if (!prevCategory) return null;
      return {
        ...prevCategory,
        items: prevCategory.items.filter((i) => i !== item),
      };
    });
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
