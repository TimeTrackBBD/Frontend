import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Login';
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import config from "../../../config.json";
import { isAuthenticated,setAccessToken } from "../../api/authenticate";

const validateUser = async () =>{
  const navigate = useNavigate();
  let authenticated = await isAuthenticated(); //add this to your component if you want it to check for authentication.
  let queryString = window.location.search;
  if (authenticated){
    navigate('/home');
  }
  if (queryString && !authenticated ) {
    const params = new URLSearchParams(queryString);
    let code = params.get('code')
    await setAccessToken(code, navigate);
  }
}

export const LoginPage = () => {
  validateUser();

  return (
    <Box className="login-page-container">
      <AppBar position="static" className="appBar">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
          <Typography id="welcome-modal-title" variant="h3" component="h2">
            Welcome to Timetrack!
          </Typography>
          <Typography id="welcome-modal-description" sx={{ mt: 2 }}>
            Please log in to continue to your dashboard.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              window.location.href=`https://time-track.auth.eu-west-1.amazoncognito.com/login?response_type=code&client_id=${config.client_id}&scope=openid%20email&redirect_uri=${encodeURIComponent(config.redirect_uri)}`;
            }}
            startIcon={<LoginIcon />}
            className="logIn-Button"
            size="Large"
            sx={{ mt: 3 }}
          >
            Log In
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
};
