import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Home />
      {/* <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/update" element={<Update />}></Route>
      </Routes> */}
    </>
  );
}

export default App;
