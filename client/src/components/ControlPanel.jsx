import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Dropdowns from "./Dropdowns";
import Sliders from "./Sliders";
import Modal from "./Modal";
import ImageUpload from "./ImageUpload";
// import FireBase from "./Firebase";
import Checkboxes from "./Checkboxes";
import axios from "axios";

const ControlPanel = ({ clearImage }) => {
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [dropdown3, setDropdown3] = useState("");
  // const [dropdown4, setDropdown4] = useState("");
  // const [dropdown5, setDropdown5] = useState("");
  const [slider1, setSlider1] = useState(1);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    seasons: [false, false, false, false],
    occasion: [false, false, false, false],
  });

  const imageUploadRef = useRef();

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
    // setDropdown4("");
    // setDropdown5("");
    setSlider1(1);
    setCheckboxes({
      seasons: [false, false, false, false],
      occasion: [false, false, false, false],
    });
  };

  const handleSubmit = async () => {
    const imageUrl = imageUploadRef.current.getImageUrl();
    const isUploading = imageUploadRef.current.isUploading();

    console.log("Submitting image URL:", imageUrl);

    if (isUploading || !imageUrl) {
      alert("Image is still uploading or not selected.");
      return;
    }

    const selectedSeasons = ["Summer", "Autumn", "Winter", "Spring"].filter(
      (season, index) => checkboxes.seasons[index]
    );
    const selectedOccasion = [
      "Party",
      "Business",
      "Red Carpet",
      "Casual",
    ].filter((season, index) => checkboxes.occasion[index]);

    const formattedSeasons = `[${selectedSeasons.join(", ")}]`;
    const formattedOccasion = `[${selectedOccasion.join(", ")}]`;

    const dataToSend = {
      category: dropdown1,
      type: dropdown2,
      color: dropdown3,
      seasons: formattedSeasons,
      occasion: formattedOccasion,
      //seasons: selectedSeasons,
      //seasons: JSON.stringify(selectedSeasons),
      // seasons: dropdown4,
      //occasion: dropdown5,
      energyLevel: slider1,
      img: imageUrl,
    };

    console.log(dataToSend);

    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/clothes",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Submitted data", response.data);
      setIsFeedbackOpen(true);
      resetForm();
      imageUploadRef.current.clearImage();
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const handleCheckboxChange = (group, index) => {
    setCheckboxes((prev) => ({
      ...prev,
      [group]: prev[group].map((checked, i) =>
        i === index ? !checked : checked
      ),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mt-6 p-4 bg-white shadow rounded-lg ${
        isShaking ? "animate-shake" : ""
      } w-full max-w-lg`}>
      <h2 className="text-xl font-semibold text-blue-700 mb-4">
        Item Attributes
      </h2>
      <ImageUpload ref={imageUploadRef} />
      <Dropdowns
        dropdown1={dropdown1}
        setDropdown1={setDropdown1}
        dropdown2={dropdown2}
        setDropdown2={setDropdown2}
        dropdown3={dropdown3}
        setDropdown3={setDropdown3}
        // dropdown4={dropdown4}
        // setDropdown4={setDropdown4}
        // dropdown5={dropdown5}
        // setDropdown5={setDropdown5}
      />
      <Checkboxes
        checkboxes={checkboxes}
        handleCheckboxChange={handleCheckboxChange}
      />
      <Sliders slider1={slider1} setSlider1={setSlider1} />

      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-sky-600 to-teal-400 text-white font-bold py-2 px-4 rounded shadow hover:from-sky-700 hover:to-teal-500 transition"
          disabled={
            imageUploadRef.current && imageUploadRef.current.isUploading()
          }>
          Add To Closet
        </button>
        <button
          onClick={handleClear}
          className="ml-2 w-full bg-gradient-to-r from-red-500 to-orange-400 text-white font-bold py-2 px-4 rounded shadow hover:from-red-600 hover:to-orange-500 transition">
          Clear Form
        </button>
      </div>
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        message="Are you sure you want to clear all inputs?"
        onConfirm={handleConfirmClear}
        onCancel={() => setIsConfirmOpen(false)}
        showCancelButton={true}
        confetti={false}
      />
      <Modal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        message="The item has been successfully added."
        onConfirm={() => setIsFeedbackOpen(false)}
        showCancelButton={false}
        confetti={true}
      />
    </motion.div>
  );
};

export default ControlPanel;
