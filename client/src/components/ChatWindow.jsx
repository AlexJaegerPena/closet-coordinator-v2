import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { TbMessageChatbot } from "react-icons/tb";

const ChatWindow = ({ isVisible, onClose, chatData, setChatData }) => {
  const messagesEndRef = useRef(null);
  const [userMessage, setUserMessage] = useState("");
  const [comeBack, setComeBack] = useState("");

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
        "http://localhost:8000/api/v1/chat/completions/2",
        {
          model: "gpt-4o-mini",
          messages: [...chatData, newMessage, comeBack.length > 0 && comeBack],
          stream: false,
        },
        {
          headers: {
            provider: "open-ai",
            mode: "developement",
            // mode: "production",
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
      setComeBack((prevMessages) => [...prevMessages, assistantMessage]);
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

  const RenderMessage = ({ msg, index }) => {
    if (msg.imageUrl) {
      return (
        <div
          key={index}
          className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
        >
          <div
            className={`inline-block p-2 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <div
              className={`mb-2 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.content && <p>{msg.content}</p>}
                <img
                  src={msg.imageUrl}
                  alt="Chat Response"
                  className="max-w-full mt-2 rounded"
                />
              </div>
            </div>
          </div>
// ---------------------- main
//     return (
//       <div key={index} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
//         <div className={`inline-block p-2 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
//           {msg.content && <p>{msg.content}</p>}
//           {msg.imageUrl && (
//             <img src={msg.imageUrl} alt="Chat Response" className="max-w-full mt-2 rounded" />
//           )}

        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        right: 15,
        bottom: 80,
        zIndex: 1000,
      }}
      className={`w-[93%] h-[73%] bg-white border-2 border-white shadow-lg rounded-lg ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-r from-red-500 to-orange-400 text-white p-4 flex justify-between items-center border-b border-gray-200 rounded-lg">
          <TbMessageChatbot className="text-2xl -mr-36" />
          <h2 className="text-lg font-semibold">Chat with Closet</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">

          {chatData?.map((msg, index) => RenderMessage({ msg, index }))}
          
// --------------- main
//           {chatData?.map((msg, index) => (
//             <RenderMessage key={index} msg={msg} index={index} />
//           ))}

          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-2">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded"
          />
          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ChatWindow;