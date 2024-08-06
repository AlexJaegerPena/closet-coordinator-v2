import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRandom } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";

const Wardrobe = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="flex flex-col h-screen px-4 py-4">
      <div className="flex flex-col flex-grow">
        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl mx-auto mb-4">
          <Link to="/clothes-list">
            <div className="img-box relative w-full h-48 bg-gray-200 border-4 border-white rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://img01.ztat.net/article/spp-media-p1/c64bdecbf99a460fa2804aab18f2ea86/74131e965bc64dc4aedb3a671fa0e7c0.jpg?imwidth=1800&filter=packshot"
                alt="Jacket"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </Link>
          <Link to="/clothes-list">
            <div className="img-box relative w-full h-48 bg-gray-200 border-4 border-white rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://img01.ztat.net/article/spp-media-p1/6df2072f78b041129f50d37a59b1faf6/d457f7b794454b8ea3aa79b04e9e5564.jpg?imwidth=1800&filter=packshot"
                alt="Sweater"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </Link>
          <Link to="/clothes-list">
            <div className="img-box relative w-full h-48 bg-gray-200 border-4 border-white rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://img01.ztat.net/article/spp-media-p1/e9fdf4f0bc5248e6855e87c247cce063/4d96b8baf2be4e38a9113d22ff4c9ec3.jpg?imwidth=1800&filter=packshot"
                alt="Trousers"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </Link>
          <Link to="/clothes-list">
            <div className="img-box relative w-full h-48 bg-gray-200 border-4 border-white rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://img01.ztat.net/article/spp-media-p1/637562911a7e36c28ce77c9db69b4cef/00373c35a7f94b4b84a4e070879289a2.jpg?imwidth=1800"
                alt="Shoes"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </Link>
          <Link to="/clothes-list">
            <div className="img-box relative w-full h-48 bg-gray-200 border-4 border-white rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://img01.ztat.net/article/spp-media-p1/b8cd4c4adeb3319fb6b4e3c0deabde0b/cf6b6464162b4aafb83a7ac50e3cae68.jpg?imwidth=1800&filter=packshot"
                alt="Image 8"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </Link>
          <Link to="/clothes-list">
            <div className="img-box relative w-full h-48 bg-gray-200 border-4 border-white rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://img01.ztat.net/article/spp-media-p1/50ca52f0675d48c5af8f19394808cc55/8e2e171a77604d7b8487d907a8f869f2.jpg?imwidth=1800&filter=packshot"
                alt="Image 9"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </Link>
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
