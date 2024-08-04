// src/App.jsx
import React, { useState } from "react";

const Wardrobe = () => {
  const [showOptions, setShowOptions] = useState(false);

  const images = [
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/200x300",
    "https://via.placeholder.com/200x300",
    "https://via.placeholder.com/200x300",
  ];

  return (
    <div className="flex flex-col h-max-screen">
      <div className="flex pt-4 flex-grow">
        {/* Linke Seite */}
        <div className="flex flex-col items-center justify-center w-1/4 p-4 space-y-10">
          {images.slice(0, 4).map((src, index) => (
            <div
              key={index}
              className="w-24 h-24 bg-gray-200 border rounded-3xl overflow-hidden"
            >
              <img
                src={src}
                alt={`Image ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {/* Mitte */}
        <div className="flex flex-col items-center justify-center w-1/2 p-4 space-y-4">
          {images.slice(4, 7).map((src, index) => (
            <div
              key={index}
              className="w-40 h-48 bg-gray-200 border rounded-3xl overflow-hidden"
            >
              <img
                src={src}
                alt={`Image ${index + 4}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {/* Rechte Seite */}
        <div className="flex flex-col items-center justify-center w-1/4 p-4 space-y-10">
          {images.slice(0, 4).map((src, index) => (
            <div
              key={index}
              className="w-24 h-24 bg-gray-200 border rounded-3xl overflow-hidden"
            >
              <img
                src={src}
                alt={`Image ${index + 4}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center pt-8">
        {showOptions ? (
          <div className="flex space-x-4">
            <button
              className="btn bg-green-500 w-24 h-14 text-white text-xl rounded-3xl"
              onClick={() => setShowOptions(false)}
            >
              Ja
            </button>
            <button
              className="btn bg-red-500 w-24 h-14 text-white text-xl rounded-3xl"
              onClick={() => setShowOptions(false)}
            >
              Nein
            </button>
          </div>
        ) : (
          <button
            className="btn bg-gradient-to-r from-sky-600 to-teal-400 w-60 h-14 text-white text-xl rounded-3xl"
            onClick={() => setShowOptions(true)}
          >
            Clothe Me!
          </button>
        )}
      </div>
    </div>
  );
};

export default Wardrobe;
