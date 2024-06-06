import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { useNavigate, useLocation } from "react-router-dom";
import { formatTime } from "../../utils/utils";
import { editTask } from "../../api/api";
import "./TimerPage.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { isAuthenticated } from "../../api/authenticate";

export const TimerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let task = location?.state?.task;

  const [time, setTime] = useState(task?.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [dialogueText, setDialogueText] = useState("");

  const validateUser = async () => {
    const authenticated = await isAuthenticated(); //add this to your component if you want it to check for authentication.
    if (!authenticated) {
      navigate("/");
    }
  };

  const validateTask = async () => {
    if (task.taskId==''){
      navigate('/home')
    }
  };

  useEffect(() => {
    validateUser();
    validateTask();
  }, []);

  if (!task){
    task = {
      taskId: '',
      projectId: '',
      taskName: '',
      description: '',
      priorityId: ''
    }

  }

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
      setDialogueText("Your time has been captured!");
    } catch (error) {
      setDialogueText("Time could not be captured!");
    } finally {
      setIsSaveDialogOpen(true);
    }
  };

  return (
    <Box className="timer-page-container">
      <AppBar position="static" className="appBar">
        <Toolbar>
          <Button
            onClick={async () => {
              if (isRunning) {
                setIsLeaveDialogOpen(true);
              } else {
                await updateTask();
                navigate("/home");
              }
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
              if (isRunning) {
                setIsLeaveDialogOpen(true);
              } else {
                sessionStorage.clear();
                navigate("/");
              }
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
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
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
              onClick={isRunning ? handlePause : handleStart}
              className="startButton"
              size="large"
            >
              {!isRunning ? "Start" : "Pause"}
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
      <Dialog open={isSaveDialogOpen} type>
        <DialogTitle id="alert-dialog-title">
          {dialogueText == "Your time has been captured!" ? "Saved" : "Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogueText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            autoFocus
            onClick={() => {
              setIsSaveDialogOpen(false);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isLeaveDialogOpen} type>
        <DialogTitle id="alert-dialog-title">{"Alert!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Please stop your timer before leaving!"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            autoFocus
            onClick={() => {
              setIsLeaveDialogOpen(false);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
