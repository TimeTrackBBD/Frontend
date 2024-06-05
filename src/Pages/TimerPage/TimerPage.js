import React, { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography, Button, Grid, Paper } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { useNavigate, useLocation } from "react-router-dom";
import { formatTime } from "../../utils/utils";
import { editTask } from "../../api/api";
import "./TimerPage.css";

export const TimerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location?.state?.task;

  const [time, setTime] = useState(task?.duration);
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

  const updateTask = async () => {
    try {
      await editTask(
        task?.taskId,
        task?.projectId,
        task?.taskName,
        task?.description,
        task?.priorityId,
        time
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Box className="timer-page-container">
      <AppBar position="static" className="appBar">
        <Toolbar>
          <Button
            onClick={async () => {
              await updateTask();
              navigate("/home");
            }}
            startIcon={<ArrowBackIcon />}
            className="BackButton"
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
            onClick={async () => {
              await updateTask();
              sessionStorage.clear();
              navigate("/");
            }}
            startIcon={<LogoutIcon />}
            className="LogoutButton"
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
          <Paper
            elevation={0}
            sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
          >
            <Typography variant="h2" className="task-name" align="center">
              {task.taskName}
            </Typography>
          </Paper>
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
        <Grid item container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              onClick={handleStart}
              className="startButton"
              size="large"
              disabled={isRunning}
            >
              Start
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={async () => {
                handlePause();
                await updateTask();
              }}
              className="saveButton"
              size="large"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
