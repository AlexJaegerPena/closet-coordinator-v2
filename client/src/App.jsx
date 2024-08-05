import {useEffect,useState} from 'react'
import axios from 'axios'
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
// import Header from "./components/Header";
// import X from "./components/X.jsx";
import Weather from './components/Weather.jsx'
import Home from "./pages/Home.jsx";
import ClothesSettings from "./pages/ClothesSettings.jsx";
import ClothesList from "./pages/ClothesList.jsx";
import Navbar from "./components/Navbar.jsx";
import Update from "./pages/Update.jsx";

function App() {
const [weather, setWeather] = useState(null)
const [location, setLocation] = useState({ latitude: null, longitude: null });

const getGPT = async() => { 
  try {
    const {data} = await axios.post(
      'http://localhost:5050/api/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: weather,
        stream: false,
      },
      {
        headers: {
          provider: 'open-ai',
          mode: 'development',
          // mode: 'production',
          'Content-Type': 'application/json',
        }
      }
    );
    console.log(data?.message?.content.slice(7,-3));
  } catch (error) {
    console.error('Error:', error);
  }
}

useEffect(() => {
  getGPT()
}, [weather,location])


  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />
      <Weather setWeather={setWeather} weather={weather} location={location} setLocation={setLocation} />
      {/* <X/> */}

      <div className="flex-grow">
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
