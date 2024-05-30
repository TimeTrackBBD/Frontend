import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box, Paper } from "@mui/material";
import { formatTime } from "../../utils/formatTime";

export const TimerPage = () => {
  const [time, setTime] = useState(0);
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
    <>
      <Paper
        square
        elevation={0}
        style={{ display: "flex", background: "#585b73", padding: "1rem" }}
      >
        <Button style={{ marginRight: "auto" }}>Back</Button>
        <Typography variant="h2">TimeTrack</Typography>
        <Paper
          square
          elevation={0}
          style={{ marginLeft: "auto", background: "transparent" }}
        >
          Logo Here
        </Paper>
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
          <Typography variant="h2">Task Name</Typography>
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
