import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TTS from "./components/TTS/TTS";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [token, setToken] = useState(null); // Store the authentication token

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/speech-to-text"
          element={token ? <TTS token={token} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
