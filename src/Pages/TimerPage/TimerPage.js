import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box, Paper } from "@mui/material";
import { formatTime } from "../../utils/formatTime";
import { useLocation, useNavigate } from "react-router-dom";

export const TimerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state.task;

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
  //TODO: Make description and name editable
  //TODO: Show priority
  return (
    <>
      <Paper
        square
        elevation={0}
        style={{ display: "flex", background: "#585b73", padding: "1rem" }}
      >
        <Button
          style={{ marginRight: "auto" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </Button>

        <Typography variant="h2">TimeTrack</Typography>
        <Button
          variant="contained"
          color="error"
          style={{ marginLeft: "auto" }}
        >
          Logout
        </Button>
      </Paper>

      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={3}
        style={{
          flexGrow: 1,
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Grid item>
          <Typography variant="h2">{task.taskName}</Typography>
          <Typography variant="b1">{task.description}</Typography>
        </Grid>
        <Grid item>
          <Box
            sx={{
              border: "0.25rem solid black",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              display: "inline-block",
              boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h1">{formatTime(time)}</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={isRunning ? handlePause : handleStart}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleReset}
            style={{ margin: "0 1.5rem" }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              console.log(time);
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
