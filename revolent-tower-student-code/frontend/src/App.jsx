import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Screens/Home";

function App() {

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      {/* <img src="./src/assets/logo.png" alt=""></img> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
