import React, { useRef, useState } from "react";
// import ImageUpload from "../components/ImageUpload";
import ControlPanel from "../components/ControlPanel";
import Modal from "../components/Modal";

const Update = () => {
  const imageUploadRef = useRef();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const clearImage = () => {
    if (imageUploadRef.current) {
      imageUploadRef.current.clearImage();
    }
  };

  const handleCloseFeedback = () => {
    setIsFeedbackOpen(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-center text-blue-800">
          Add New Item
        </h1>
        {/* <ImageUpload ref={imageUploadRef} /> */}
        <ControlPanel
          clearImage={clearImage}
          onFeedback={() => setIsFeedbackOpen(true)}
        />
      </div>

      <Modal
        isOpen={isFeedbackOpen}
        onClose={handleCloseFeedback}
        title="Item Added"
        message="The item has been successfully added."
        confetti={isFeedbackOpen}
        onConfirm={handleCloseFeedback}
      />
    </div>
  );
};

export default Update;
