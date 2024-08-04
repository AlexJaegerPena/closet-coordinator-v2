import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Dropdowns from "./Dropdowns";
import Checkboxes from "./Checkboxes";
import Sliders from "./Sliders";
import TextInput from "./TextInput";
import Modal from "./Modal";
import ImageUpload from "./ImageUpload";

const ControlPanel = ({ clearImage }) => {
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [dropdown3, setDropdown3] = useState("");

  const [checkboxes, setCheckboxes] = useState({
    seasons: [false, false, false, false],
    occasion: [false, false, false, false],
  });

  const [slider1, setSlider1] = useState(1);
  const [slider2, setSlider2] = useState(1);

  const [clothesName, setClothesName] = useState("");

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const imageUploadRef = useRef();

  const handleCheckboxChange = (group, index) => {
    setCheckboxes((prev) => ({
      ...prev,
      [group]: prev[group].map((checked, i) =>
        i === index ? !checked : checked
      ),
    }));
  };

  const handleClear = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setIsConfirmOpen(true);
    }, 500);
  };

  const handleConfirmClear = () => {
    resetForm();
    clearImage();
    setIsConfirmOpen(false);
  };

  const resetForm = () => {
    setDropdown1("");
    setDropdown2("");
    setDropdown3("");
    setCheckboxes({
      seasons: [false, false, false, false],
      occasion: [false, false, false, false],
    });
    setSlider1(1);
    setSlider2(1);
    setClothesName("");
    if (imageUploadRef.current) {
      imageUploadRef.current.clearImage();
    }
  };

  const handleSubmit = () => {
    // const image = imageUploadRef.current.getImage();
    console.log("Submitted data:", {
      dropdown1,
      dropdown2,
      dropdown3,
      checkboxes,
      slider1,
      slider2,
      clothesName,
      // image,
    });
    setIsFeedbackOpen(true);
    resetForm();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mt-6 p-4 bg-white shadow rounded-lg ${
        isShaking ? "animate-shake" : ""
      }`}>
      <h2 className="text-xl font-semi-bold text-blue-700 mb-4">
        Item Attributes
      </h2>
      <ImageUpload ref={imageUploadRef} />
      <TextInput textInput={clothesName} setTextInput={setClothesName} />{" "}
      <Dropdowns
        dropdown1={dropdown1}
        setDropdown1={setDropdown1}
        dropdown2={dropdown2}
        setDropdown2={setDropdown2}
        dropdown3={dropdown3}
        setDropdown3={setDropdown3}
      />
      <Checkboxes
        checkboxes={checkboxes}
        handleCheckboxChange={handleCheckboxChange}
      />
      <Sliders
        slider1={slider1}
        setSlider1={setSlider1}
        slider2={slider2}
        setSlider2={setSlider2}
      />
      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 transition">
          Submit
        </button>
        <button
          onClick={handleClear}
          className="ml-2 w-full bg-gray-400 text-white py-2 px-4 rounded shadow hover:bg-gray-500 transition">
          Clear
        </button>
      </div>
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirm Clear"
        message="Are you sure you want to clear all inputs?"
        onConfirm={handleConfirmClear}
        onCancel={() => setIsConfirmOpen(false)}
        showCancelButton={true}
        confetti={false}
      />
      <Modal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        title="Item Added"
        message="The item has been successfully added."
        onConfirm={() => setIsFeedbackOpen(false)}
        showCancelButton={false}
        confetti={true}
      />
    </motion.div>
  );
};

export default ControlPanel;
