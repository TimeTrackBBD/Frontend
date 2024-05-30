import React from "react";
import { Paper, Box, Button, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { formatTimeWithUnits } from "../../utils/formatTime";

const projects = [
  { projectName: "Sanlam" },
  { projectName: "Grad Program" },
  { projectName: "Personal project" },
];

const tasks = [
  { taskId: 1, taskName: "Make frontend", duration: 1254 },
  { taskId: 2, taskName: "Make backend", duration: 4564 },
  ,
  { taskId: 3, taskName: "Make DB", duration: 55500 },
];
//TODO: Handle if no projects
//TODO: Finish designs
//TODO: How to show description?

export const HomePage = () => {
  return (
    <>
      <Paper
        square
        elevation={0}
        style={{
          display: "flex",
          background: "#585b73",
          padding: "1rem",
        }}
      >
        <Button style={{ marginRight: "auto" }}></Button>
        <Typography variant="h2">TimeTrack</Typography>
        <Paper
          square
          elevation={0}
          style={{ marginLeft: "auto", background: "transparent" }}
        >
          Logo Here
        </Paper>
      </Paper>

      <Paper
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignSelf: "center",
          padding: "1rem",
          width: "50vw",
        }}
      >
        <Paper
          style={{ display: "flex", flexDirection: "row" }}
          square
          elevation={0}
        >
          <Typography variant="h5" fontWeight={600}>
            Your projects
          </Typography>
          <Button
            style={{ marginLeft: "auto" }}
            variant="contained"
            color="success"
          >
            Create project
          </Button>
        </Paper>

        {projects.map((project, index) => (
          <Accordion key={index} style={{ margin: "0.5rem 0" }}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h6" fontWeight={600}>
                {project.projectName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                style={{ marginLeft: "auto", marginRight: "0.5rem" }}
                variant="contained"
              >
                Create task
              </Button>
              <Paper square elevation={0}>
                {tasks.map((task) => (
                  <Box
                    sx={{
                      margin: "0.5rem",
                      border: "0.2rem solid black",
                      padding: "1rem",
                      borderRadius: "1rem",
                      display: "inline-block",
                      cursor: "pointer",
                      boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)",
                    }}
                    key={task.taskId}
                    onClick={() => {
                      console.log(task.taskName);
                    }}
                  >
                    <Typography variant="h7" fontWeight={500}>
                      {task.taskName}
                    </Typography>
                    <Typography>
                      {"Duration: " + formatTimeWithUnits(task.duration)}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </>
  );
};
