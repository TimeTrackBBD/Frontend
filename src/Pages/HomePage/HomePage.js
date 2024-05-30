import React from "react";
import { Paper, Button, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TaskCard } from "../../Components/TaskCard";
import { formatTimeWithUnits } from "../../utils/formatTime";

const tasks = [
  {
    taskId: 1,
    taskName: "Make frontend",
    duration: 1254,
    priority: "Low",
    description: "This is a very important task!",
  },
  {
    taskId: 2,
    taskName: "Make backend",
    duration: 4564,
    priority: "Medium",
    description: "This is a very important task!",
  },
  {
    taskId: 3,
    taskName: "Make DB",
    duration: 55500,
    priority: "High",
    description: "This is a very important task!",
  },
];

const projects = [
  { projectName: "Sanlam", tasks: tasks },
  { projectName: "Grad Program", tasks: tasks },
  { projectName: "Personal project", tasks: tasks },
];

const getTotalTime = (project) => {
  let totalTime = project.tasks.reduce(
    (total, task) => total + task.duration,
    0
  );
  return totalTime;
};
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
        <Button style={{ marginRight: "auto" }}>Back</Button>
        <Typography variant="h2">TimeTrack</Typography>
        <Button
          variant="contained"
          color="error"
          style={{ marginLeft: "auto" }}
        >
          Logout
        </Button>
      </Paper>

      <Paper
        square
        elevation={0}
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignSelf: "center",
          padding: "1rem",
          width: "50vw",
          background: "inherit",
        }}
      >
        <Paper
          style={{
            display: "flex",
            flexDirection: "row",
            background: "inherit",
          }}
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
          <Accordion
            key={index}
            style={{
              margin: "0.5rem 0",
              borderRadius: "0.5rem",
              border: "transparent",
            }}
          >
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h6" fontWeight={600}>
                {project.projectName}
              </Typography>
              <Typography
                variant="b1"
                fontWeight={600}
                marginLeft={"auto"}
                alignSelf={"center"}
              >
                {"Total time spent: " +
                  formatTimeWithUnits(getTotalTime(project))}
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
                {project.tasks.map((item) => (
                  <TaskCard task={item}></TaskCard>
                ))}
              </Paper>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </>
  );
};
