import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HomePage } from "./Pages/HomePage";
import { Typography } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Typography variant={"h1"} fontWeight={900}>
      Timetrack
    </Typography>
    <HomePage />
  </React.StrictMode>
);
