import * as React from "react";
import { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography, Button, Grid } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import "./TimerPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { formatTime } from "../../utils/utils";

export const TimerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state
    ? location.state.task
    : {
        taskName: "Sample Task",
        description: "Sample Description",
        duration: 0,
      };

  const [time, setTime] = useState(task.duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <Box className="timer-page-container">
      <AppBar position="static" className="appBar">
        <Toolbar>
          <Button
            onClick={() => {
              navigate("/home");
            }}
            startIcon={<ArrowBackIcon />}
            className="customButton"
            size="medium"
          >
            Back
          </Button>
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
          <Button
            variant="contained"
            onClick={() => {
              navigate("/home");
            }}
            startIcon={<LogoutIcon />}
            className="customButton"
            size="medium"
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={3}
        className="content-container"
      >
        <Grid item>
          <Typography variant="h2" className="task-name">
            {task.taskName}
          </Typography>
          <Typography variant="body1" className="task-description">
            {task.description}
          </Typography>
        </Grid>
        <Grid item>
          <Box className="timer-display">
            <Typography variant="h1" className="timer-text">
              {formatTime(time)}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            className={`startButton ${isRunning ? "pauseButton" : ""}`}
            onClick={isRunning ? handlePause : handleStart}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button
            variant="contained"
            className="resetButton"
            onClick={handleReset}
            style={{ margin: "0 1.5rem" }}
          >
            Reset
          </Button>
          <Button variant="contained" className="saveButton" onClick={() => {}}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
