import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Box className="login-page-container">
      <AppBar position="static" className="appBar">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <PendingActionsIcon className="pendingActionsIcon" />
            <Typography
              variant="h4"
              component="div"
              className="timeTrackHeading"
            >
              Timetrack
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Modal
        open={true}
        aria-labelledby="welcome-modal-title"
        aria-describedby="welcome-modal-description"
      >
        <Paper className="modal-content">
          <Typography id="welcome-modal-title" variant="h5" component="h2">
            Welcome to Timetrack
          </Typography>
          <Typography id="welcome-modal-description" sx={{ mt: 2 }}>
            Please log in to continue to your dashboard.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/home");
            }}
            startIcon={<GitHubIcon />}
            className="customButton"
            size="medium"
            sx={{ mt: 3 }}
          >
            Log In
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
};
