import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import STT from "./components/STT/STT";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [auth, setAuth] = useState({
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password"),

  });
  useEffect(() => {
    if (auth.username && auth.password) {
      localStorage.setItem("username", auth.username);
      localStorage.setItem("password", auth.password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
  }, [auth]);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login
              setAuth={(credentials) => setAuth(credentials)}
            />
          }
        />
        <Route
          path="/speech-to-text/"
          element={
            auth.username && auth.password ? (
              <STT username={auth.username} password={auth.password} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
