import React, { useRef, useState, useCallback } from "react";
import ControlPanel from "../components/ControlPanel";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
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
    <div>
      <Navbar />
      <div className="min-h-screen bg-blue-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8 mb-12">
          {/* <h1 className="text-3xl font-bold text-center text-blue-800">
            Add New Item
          </h1> */}
          <ControlPanel
            clearImage={clearImage}
            onFeedback={handleFeedbackOpen}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Update;
