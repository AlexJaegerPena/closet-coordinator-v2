import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { FaRandom } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import ChatWindow from "./ChatWindow";

// Helper function to fetch images by category
const fetchImagesByCategory = async (category) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/clothes/category/${category}`
    );
    console.log(response);
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
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [chatVisible, setChatVisible] = useState(false);
  const [chatData, setChatData] = useState([]);

  const getGPT = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: weather,
          stream: false,
        },
        {
          headers: {
            provider: "open-ai",
            mode: "developement",
            // mode: "production",
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(data?.message?.content.slice(7, -3));
      console.log(data);
      setChatData([
        {
          role: "assistant",
          content:
            data?.message?.content.slice(7, -3) || "No content available.",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getGPT();
  }, [weather, location]);

  const toggleChat = () => {
    setChatVisible((prev) => !prev);
  };

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("images"));
    if (storedImages) {
      setImages(storedImages);
    } else {
      fetchImages();
    }
  }, []);

  const fetchImages = async () => {
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
    localStorage.setItem("images", JSON.stringify(categoryImages)); // Save to localStorage
  };

  const handleClick = () => {
    setShowOptions(true);
    fetchImages(); // Fetch new images without reloading the page
  };

  return (
    <div className="flex flex-col h-min-screen px-4 py-4">
      <div className="flex flex-col mb-8">
        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
          {Object.keys(images).map((category, index) => (
            <Link
              to={`/clothes-list?category=${encodeURIComponent(category)}`}
              key={index}
            >
              <div className="img-box relative w-full h-44 bg-gray-200 border-4 border-white rounded-3xl overflow-hidden shadow-2xl">
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
      </div>

      {/* Button Section */}
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex flex-row items-center justify-center">
          <button
            className="btn bg-gradient-to-r from-sky-600 to-teal-400 w-44 h-12 text-white text-m rounded-2xl shadow-xl border-2 border-white hover:bg-teal-500"
            onClick={handleClick}
          >
            <FaRandom />
            {showOptions ? "Clothe Me Again!" : "Clothe Me!"}
          </button>
        </div>
        <button
          className="btn bg-gradient-to-r from-red-500 to-orange-400 w-44 h-12 text-white text-m rounded-2xl shadow-xl border-2 border-white hover:bg-teal-500"
          onClick={toggleChat}
        >
          <TbMessageChatbot className="text-2xl" />
          Chat with Closet
        </button>
        <ChatWindow
          isVisible={chatVisible}
          onClose={toggleChat}
          chatData={chatData}
          setChatData={setChatData}
        />
      </div>
    </div>
  );
};

export default Wardrobe;
