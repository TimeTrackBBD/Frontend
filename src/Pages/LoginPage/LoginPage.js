import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="appBar">
        <Toolbar>
          <PendingActionsIcon className="pendingActionsIcon" />
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
            className="timeTrackHeading"
          >
            Timetrack
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/home");
            }}
            startIcon={<GitHubIcon />}
            className="customButton"
            size="medium"
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Box className="fixedModalContainer">
        <Box className="customFixedModal">
          <Typography variant="h6" className="modalText">
            Please login to proceed.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
