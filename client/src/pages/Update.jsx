import React, { useRef, useState, useCallback } from "react";
import ControlPanel from "../components/ControlPanel";
import Modal from "../components/Modal";

const Update = () => {
  const imageUploadRef = useRef();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const clearImage = useCallback(() => {
    if (imageUploadRef.current) {
      imageUploadRef.current.clearImage();
    }
  }, []);

  const handleCloseFeedback = useCallback(() => {
    console.log("Closing feedback modal");
    setIsFeedbackOpen(false);
  }, []);

  const handleFeedbackOpen = useCallback(() => {
    console.log("Opening feedback modal");
    setIsFeedbackOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-center text-blue-800">
          Add New Item
        </h1>
        <ControlPanel clearImage={clearImage} onFeedback={handleFeedbackOpen} />
      </div>

      <Modal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        message="The item has been successfully added."
        onConfirm={() => setIsFeedbackOpen(false)}
        showCancelButton={false} // Hide cancel button
        confetti={isFeedbackOpen}
      />
    </div>
  );
};

export default Update;
