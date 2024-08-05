import React, { useState, useEffect } from "react";
import Firebase from "./Firebase";
import { useUserContext } from "../contexts/userContext.jsx";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase.jsx";
import { v4 } from "uuid";
import axios from "axios";
import SaveButton from "./SaveButton"; // Importieren der neuen Komponente

const ClothesFormPopup = ({ setMessages, messages }) => {
  const { user, clothes, setClothes } = useUserContext();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [form, setForm] = useState({
    category: "",
    type: "",
    color: "",
    season: "",
    occasion: "",
    img: "",
    energyLevel: "",
  });

  const url = `http://localhost:5050/api/v1`;

  const handleSubmit = async () => {
    await uploadFile();
  };

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setForm({ ...form, img: url });
      });
    });
  };

  useEffect(() => {
    const addClothes = async () => {
      const { data } = await axios.post(`${url}/clothes`, form);
      console.log(data);
    };
    if (form.img) {
      addClothes();
    }
  }, [form.img]);

  useEffect(() => {
    const getImage = async () => {
      const singleImageRef = ref(storage);
      await getDownloadURL(singleImageRef).then((res) => {
        setImageUrl(res);
      });
    };
    getImage();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      {imageUrl && (
        <img
          alt="Uploaded Preview"
          src={imageUrl}
          className="object-cover w-full h-48 rounded-md"
        />
      )}
      <input
        type="file"
        onChange={(event) => setImageUpload(event.target.files[0])}
        className="block w-full text-sm text-gray-900 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
      />
      <div className="space-y-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Clothes Category
          </label>
          <select
            name="category"
            value={form.category}
            required
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="block w-full mt-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="">Select a category</option>
            <option value="shirt">Shirt</option>
            <option value="pants">Pants</option>
            <option value="jacket">Jacket</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            value={form.type}
            required
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="block w-full mt-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="">Select a type</option>
            <option value="sports">Vest</option>
            <option value="holiday">Short Sleeves</option>
            <option value="formal">Long Sleeves</option>
            <option value="informal">Blues</option>
          </select>
        </div>

        {/* Occasion */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Occasion
          </label>
          <select
            value={form.occasion}
            name="occasion"
            required
            onChange={(e) => setForm({ ...form, occasion: e.target.value })}
            className="block w-full mt-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="">Select an occasion</option>
            <option value="sports">Sports</option>
            <option value="holiday">Holiday</option>
            <option value="formal">Formal</option>
            <option value="informal">Informal</option>
          </select>
        </div>

        <SaveButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default ClothesFormPopup;
