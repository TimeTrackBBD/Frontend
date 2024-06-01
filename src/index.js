import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { TimerPage } from "./Pages/TimerPage/TimerPage";
import { HomePage } from "./Pages/HomePage/HomePage";
import { Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Paper
    square
    elevation={0}
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <React.StrictMode style={{ height: "100%" }}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/timer" element={<TimerPage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Paper>
);
