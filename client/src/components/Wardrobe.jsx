import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRandom } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";

// Helper function to fetch images by category
const fetchImagesByCategory = async (category) => {
  try {
    const response = await fetch(
      `http://localhost:5050/api/v1/clothes/category/${category}`
    );
    if (!response.ok) {
      throw new Error(`Network response was not ok for category ${category}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

// Helper function to get a random image from an array
const getRandomImage = (items) => {
  if (items.length === 0) return "";
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex] || {}; // Return the random item instead of just the image
};

const Wardrobe = () => {
  const [images, setImages] = useState({});
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const categories = [
        "Accessories",
        "Shirts",
        "Jackets",
        "Trousers",
        "Sweatshirts",
        "Shoes",
      ];

      const categoryImages = {};
      for (const category of categories) {
        const items = await fetchImagesByCategory(category);
        categoryImages[category] = getRandomImage(items); // Save the full item object
      }
      setImages(categoryImages);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen px-4 py-4">
      <div className="flex flex-col flex-grow">
        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl mx-auto mb-4">
          {Object.keys(images).map((category, index) => (
            <Link
              to={`/clothes-list?category=${encodeURIComponent(
                category
              )}&itemId=${images[category].id}`}
              key={index}
            >
              <div className="img-box relative w-full h-48 bg-gray-200 border-4 border-white rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={images[category].img}
                  alt={category}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300?text=No+Image")
                  }
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Button Section */}
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-row items-center justify-center">
            {showOptions ? (
              <button
                className="btn bg-gradient-to-r from-sky-600 to-teal-400 w-auto h-12 text-white text-lg rounded-3xl shadow-lg border-2 border-white hover:bg-teal-500"
                onClick={() => setShowOptions(true)}
              >
                <FaRandom />
                Clothe Me Again!
              </button>
            ) : (
              <button
                className="btn bg-gradient-to-r from-sky-600 to-teal-400 w-auto h-12 text-white text-lg rounded-3xl shadow-lg border-2 border-white hover:bg-teal-500"
                onClick={() => setShowOptions(true)}
              >
                <FaRandom />
                Clothe Me!
              </button>
            )}
          </div>
          <div>
            <button
              className="btn bg-gradient-to-r from-sky-600 to-teal-400 w-60 h-12 text-white text-lg rounded-3xl shadow-lg border-2 border-white hover:bg-teal-500"
              onClick={() => setShowOptions(true)}
            >
              <TbMessageChatbot className="text-2xl" />
              Chat with Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wardrobe;
