import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Dropdowns from "./Dropdowns";
import Sliders from "./Sliders";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { useAuthContext } from "../contexts/authContext";
const ControlPanel = ({
  clearImage,
  onFeedback,
  isEditMode = false,
  initialData = null,
  onClose,
  onUpdateItem,
}) => {
  const [dropdown1, setDropdown1] = useState(initialData?.category || "");
  const [dropdown2, setDropdown2] = useState(initialData?.type || "");
  const [dropdown3, setDropdown3] = useState(initialData?.color || "");
  const [dropdown4, setDropdown4] = useState(initialData?.season || "");
  const [dropdown5, setDropdown5] = useState(initialData?.occasion || "");
  const [slider1, setSlider1] = useState(initialData?.energyLevel || 1);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const imageUploadRef = useRef();
  const { url } = useAuthContext();

  const handleClear = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setIsConfirmOpen(true);
    }, 500);
  };
  const handleConfirmClear = () => {
    resetForm();
    imageUploadRef.current.clearImage();
    setIsConfirmOpen(false);
  };
  const resetForm = () => {
    setDropdown1("");
    setDropdown2("");
    setDropdown3("");
    setDropdown4("");
    setDropdown5("");
    setSlider1(1);
  };
  const handleSubmit = async () => {
    const imageUrl = isEditMode
      ? initialData.img
      : imageUploadRef.current.getImageUrl();
    const isUploading = !isEditMode && imageUploadRef.current.isUploading();
    if (isUploading || (!isEditMode && !imageUrl)) {
      alert("Image is still uploading or not selected.");
      return;
    }

    const dataToSend = {
      category: dropdown1,
      type: dropdown2,
      color: dropdown3,
      season: dropdown4,
      occasion: dropdown5,
      energyLevel: slider1,
      img: imageUrl,
    };
    try {
      let updatedItem;
      if (isEditMode) {
        const response = await axios.put(
          `${url}/api/v1/clothes/${initialData._id}`,
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        updatedItem = response.data.data;
        if (onUpdateItem) {
          onUpdateItem(updatedItem);
        }
      } else {
        await axios.post(`${url}/api/v1/clothes`, dataToSend, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      setIsFeedbackOpen(true);
      resetForm();
      imageUploadRef.current.clearImage();
      onFeedback && onFeedback();
      onClose && onClose();
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mt-6 p-4 bg-white shadow rounded-lg ${
        isShaking ? "animate-shake" : ""
      } w-full max-w-lg`}
    >
      <h2 className="text-xl font-semibold text-blue-700 mb-4">
        {isEditMode ? "Edit Item" : "Add New Item"}
      </h2>
      {!isEditMode && <ImageUpload ref={imageUploadRef} />}
      <Dropdowns
        dropdown1={dropdown1}
        setDropdown1={setDropdown1}
        dropdown2={dropdown2}
        setDropdown2={setDropdown2}
        dropdown3={dropdown3}
        setDropdown3={setDropdown3}
        dropdown4={dropdown4}
        setDropdown4={setDropdown4}
        dropdown5={dropdown5}
        setDropdown5={setDropdown5}
      />
      {/* <Checkboxes
        checkboxes={checkboxes}
        handleCheckboxChange={handleCheckboxChange}
      /> */}
      <Sliders slider1={slider1} setSlider1={setSlider1} />
      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-sky-600 to-teal-400 text-white font-bold py-2 px-4 rounded shadow hover:from-sky-700 hover:to-teal-500 transition"
          disabled={
            !isEditMode &&
            imageUploadRef.current &&
            imageUploadRef.current.isUploading()
          }
        >
          {isEditMode ? "Save Changes" : "Add To Closet"}
        </button>
        <button
          onClick={() => {
            if (isEditMode) {
              onClose();
            } else {
              handleClear();
            }
          }}
          className="ml-2 w-full bg-gradient-to-r from-red-500 to-orange-400 text-white font-bold py-2 px-4 rounded shadow hover:from-red-600 hover:to-orange-500 transition"
        >
          {isEditMode ? "Cancel" : "Clear Form"}
        </button>
      </div>

      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <p>Are you sure you want to clear all inputs?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="mr-2 bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClear}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {isFeedbackOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <p>Changes saved successfully!</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsFeedbackOpen(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default ControlPanel;
