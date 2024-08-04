import React, { useState, forwardRef, useImperativeHandle } from "react";

const ImageUpload = forwardRef((props, ref) => {
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFilename(file.name);
    }
  };

  const clearImage = () => {
    setImage(null);
    setFilename("");
  };

  useImperativeHandle(ref, () => ({
    clearImage,
  }));

  return (
    <div className="mb-4 text-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="imageUpload"
      />
      <label
        htmlFor="imageUpload"
        className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded">
        Choose Image
      </label>
      {image && (
        <div className="mt-4 flex flex-col items-center">
          <img
            src={image}
            alt={filename}
            className="w-48 h-auto border border-gray-300 rounded-lg shadow-md"
          />
          <p className="mt-2 text-sm text-gray-600">{filename}</p>
        </div>
      )}
    </div>
  );
});

export default ImageUpload;
