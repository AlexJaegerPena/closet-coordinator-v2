import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const ChatWindow = ({ isVisible, onClose, chatData, setChatData }) => {
  const messagesEndRef = useRef(null);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userMessage.trim()) return;

    const newMessage = {
      role: "user",
      content: userMessage,
    };

    setChatData((prevMessages) => [...prevMessages, newMessage]);

    try {
      const { data } = await axios.post(
        "http://localhost:5050/api/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [...chatData, newMessage], // include the history in the request
          stream: false,
        },
        {
          headers: {
            provider: "open-ai",
            mode: "development",
            "Content-Type": "application/json",
          },
        }
      );

      const assistantMessage = {
        role: "assistant",
        content: data?.message?.content || "No response received.",
        // imageUrl: data?.message?.imageUrl || null, // assuming server sends image URL
      };

      setChatData((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error fetching chat response:", error);
      const errorMessage = {
        role: "assistant",
        content: "An error occurred while fetching the response.",
      };
      setChatData((prevMessages) => [...prevMessages, errorMessage]);
    }

    setUserMessage("");
  };

  const renderMessage = (msg) => {
    if (msg.imageUrl) {
      return (
        <div className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
          <div className={`inline-block p-2 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
            {msg.content && <p>{msg.content}</p>}
            <img src={msg.imageUrl} alt="Chat Response" className="max-w-full mt-2 rounded" />
          </div>
        </div>
      );
    } else {
      return (
        <div className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
          <div className={`inline-block p-2 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
            {msg.content}
          </div>
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 1000,
      }}
      className={`w-80 h-96 bg-white shadow-lg rounded-lg ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-semibold">Chat</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {chatData.map((msg, index) => renderMessage(msg))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-2">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ChatWindow;
