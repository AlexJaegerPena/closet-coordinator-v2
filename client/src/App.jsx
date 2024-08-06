import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
// import Header from "./components/Header";
// import X from "./components/X.jsx";
import Weather from "./components/Weather.jsx";
import Home from "./pages/Home.jsx";
import ClothesSettings from "./pages/ClothesSettings.jsx";
import ClothesList from "./pages/ClothesList.jsx";
import Navbar from "./components/Navbar.jsx";
import Update from "./pages/Update.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      {/* <Weather /> */}
      {/* <X/> */}
      <div className="app-bg "></div>
      <div className="container flex-grow relative">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/clothes-settings" element={<Update />}></Route>
          <Route path="/clothes-list" element={<ClothesList />}></Route>
          <Route path="/update" element={<Update />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
