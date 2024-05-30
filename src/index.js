import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TimerPage } from "./Pages/TimerPage/TimerPage";
import { HomePage } from "./Pages/HomePage/HomePage";
import { Paper } from "@mui/material";
import { Home } from "@mui/icons-material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Paper
    square
    elevation={0}
    style={{
      background: "#9d9fb0",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <React.StrictMode style={{ height: "100%" }}>
      <HomePage />
    </React.StrictMode>
  </Paper>
);
