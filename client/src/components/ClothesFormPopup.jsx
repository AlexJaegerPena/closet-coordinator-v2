import React, { useState, useEffect } from "react";
import { storage } from "../utils/firebase"; // Adjust the import based on your setup
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

const ClothesFormPopup = ({ item, onClose }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(item.img || "");
  const [form, setForm] = useState({
    category: item.category || "",
    type: item.type || "",
    color: item.color || "",
    season: item.season || "",
    occasion: item.occasion || "",
    img: item.img || "",
    energyLevel: item.energyLevel || "",
  });

  useEffect(() => {
    if (item) {
      setForm({
        category: item.category || "",
        type: item.type || "",
        color: item.color || "",
        season: item.season || "",
        occasion: item.occasion || "",
        img: item.img || "",
        energyLevel: item.energyLevel || "",
      });
      setImageUrl(item.img || "");
    }
  }, [item]);

  const handleSubmit = async () => {
    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);
      setForm((prevForm) => ({ ...prevForm, img: url }));
    }

    await axios.put(`http://localhost:5050/api/v1/clothes/${item.id}`, form);
    onClose(); // Close the popup after submission
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Edit Item</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          onChange={(event) => setImageUpload(event.target.files[0])}
          className="block w-full text-sm text-gray-900 rounded-lg border border-gray-300 cursor-pointer"
        />
        {imageUrl && (
          <img src={imageUrl} alt="Preview" className="mt-2 w-full h-auto" />
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="block w-full text-sm rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <input
          type="text"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="block w-full text-sm rounded-md border-gray-300 shadow-sm"
        />
      </div>
      {/* Add other form fields as needed */}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default ClothesFormPopup;
