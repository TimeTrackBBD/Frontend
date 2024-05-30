import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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
      background: "#eeeeee",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <React.StrictMode style={{ height: "100%" }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/timer/:taskId" element={<TimerPage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Paper>
);
