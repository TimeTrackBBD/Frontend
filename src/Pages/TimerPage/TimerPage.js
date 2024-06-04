import * as React from "react";
import { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography, Button, Grid } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import "./TimerPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { formatTime } from "../../utils/utils";
import { editTask } from "../../api/api";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Paper } from "@mui/material";
import { TaskModal } from "../../Components/TaskModal/TaskModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const TimerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location?.state?.task;

  const [time, setTime] = useState(task?.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [dialogueText, setDialogueText] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

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

  // const handleTaskModalOpen = () => {
  //   setIsTaskModalOpen(true);
  // };

  // const handleTaskModalClose = () => {
  //   setIsTaskModalOpen(false);
  // };

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
            onClick={async () => {
              if (isRunning) {
                setIsLeaveDialogOpen(true);
              } else {
                sessionStorage.clear();
                navigate("/");
              }
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
          <Paper
            elevation={0}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Typography variant="h2" className="task-name">
              {task.taskName}
            </Typography>
            {/* TODO: Edit Task, issue with getting the screen to update from the modal */}
            {/* <IconButton
              sx={{
                color: "black",
                cursor: "pointer",
              }}
              onClick={() => handleTaskModalOpen()}
              color="primary"
              aria-label="edit"
            >
              <EditIcon
                sx={{
                  paddingLeft: "0.5rem",
                  fontSize: "2.5rem",
                }}
              />
            </IconButton> */}
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
            className="saveButton"
            onClick={updateTask}
          >
            Save
          </Button>
        </Grid>
      </Grid>
      {/* <TaskModal
        isOpen={isTaskModalOpen}
        handleModalClose={handleTaskModalClose}
        task={task}
      /> */}
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
