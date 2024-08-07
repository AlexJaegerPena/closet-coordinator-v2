import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  message,
  onConfirm,
  showCancelButton,
  onCancel,
  confetti,
}) => {
  if (!isOpen) return null;

  useEffect(() => {
    // Prevent default behavior for the escape key
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={300}
          recycle={false}
          gravity={0.3}
          run={isOpen}
          confettiSource={{
            x: 0,
            y: 100,
            w: dimensions.width,
            h: 0,
          }}
        />
      )}
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative"
          style={{ maxWidth: "90%", margin: "auto" }}
        >
          <p className="mb-6 text-center">{message}</p>
          <div className="flex justify-center space-x-4 mt-4">
            {showCancelButton && (
              <button
                onClick={onCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
            <button
              onClick={onConfirm}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </motion.div>
      </div>
      document.body
    </>
  );
};

export default Modal;
