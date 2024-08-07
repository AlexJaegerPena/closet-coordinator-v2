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

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <p>{message}</p>
        <div className="flex justify-end mt-4">
          {showCancelButton && (
            <button
              onClick={onCancel}
              className="mr-2 bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
          )}
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            OK
          </button>
        </div>
        {confetti && <div className="confetti"></div>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
