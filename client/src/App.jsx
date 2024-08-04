import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Header from "./components/Header";
import Navbar from "./components/Navbar.jsx";
// import X from "./components/X.jsx";
import ClothesForm from "./components/ClothesForm.jsx";
import Home from "./pages/Home.jsx";
import ClothesSettings from "./pages/ClothesSettings.jsx";



function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      {/* <X/> */}
      <ClothesForm/>
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/clothes-settings" element={<ClothesSettings />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;