import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const Modal = ({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  onCancel,
  confetti,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen && confetti) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, confetti]);

  if (!isOpen) return null;

  // Get viewport dimensions
  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {showConfetti && (
        <div className="absolute inset-0 z-40">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={300}
            gravity={0.3}
            initialVelocityY={10} // Start confetti falling from the top
          />
        </div>
      )}
      <div
        className="fixed inset-0 bg-gray-500 opacity-50 z-30"
        onClick={onCancel}></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg z-50">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}>
          <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
          <p className="mt-2 text-gray-700">{message}</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onConfirm}
              className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 transition">
              OK
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Modal;
