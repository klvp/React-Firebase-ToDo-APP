/** @format */
import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
