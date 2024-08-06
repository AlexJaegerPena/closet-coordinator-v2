import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ClothesList from "./pages/ClothesList.jsx";
import ClothesListTwo from "./pages/ClothesListTwo.jsx";
import Navbar from "./components/Navbar.jsx";
import Update from "./pages/Update.jsx";
import ChatWindow from "./components/ChatWindow.jsx";

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [loginName, setLoginName] = useState(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatData, setChatData] = useState([]);

  const getGPT = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: weather,
          stream: false,
        },
        {
          headers: {
            provider: "open-ai",
            mode: "developement",
            // mode: 'production',
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(data?.message?.content.slice(7, -3));
      console.log(data);
      setChatData([
        {
          role: "assistant",
          content:
            data?.message?.content.slice(7, -3) || "No content available.",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getGPT();
  }, [weather, location]);

  const toggleChat = () => {
    setChatVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700">
          Chat with Closet
        </button>
      </div>
      <ChatWindow
        isVisible={chatVisible}
        onClose={toggleChat}
        chatData={chatData}
        setChatData={setChatData}
      />

      <div className="app-bg "></div>
      <div className="container flex-grow relative">
        <Routes>
          <Route
            path="/"
            element={
              <Home loginName={loginName} setLoginName={setLoginName} />
            }></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/clothes-list" element={<ClothesList />}></Route>
          {/* <Route path="/clothes-list" element={<ClothesListTwo />}></Route> */}
          <Route path="/update" element={<Update />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
