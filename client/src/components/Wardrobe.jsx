import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <div className="flex flex-col items-center justify-center">
          {showOptions ? (
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xl font-semibold text-gray-700">
                Are you satisfied with your outfit?
              </span>
              <div className="flex space-x-4">
                <button
                  className="btn bg-gradient-to-r from-green-600 to-green-300 w-28 h-12 text-white text-lg rounded-3xl shadow-gl hover:bg-green-500"
                  onClick={() => setShowOptions(false)}
                >
                  Yes
                </button>
                <button
                  className="btn bg-gradient-to-r from-orange-500 to-amber-300 w-48 h-12 text-white text-lg rounded-3xl shadow-lg hover:bg-teal-500"
                  onClick={() => setShowOptions(false)}
                >
                  Clothe Me Again
                </button>
              </div>
            </div>
          ) : (
            <button
              className="btn bg-gradient-to-r from-sky-600 to-teal-400 w-60 h-12 text-white text-lg rounded-3xl shadow-lg border-2 border-white hover:bg-teal-500"
              onClick={() => setShowOptions(true)}
            >
              Clothe Me!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wardrobe;
