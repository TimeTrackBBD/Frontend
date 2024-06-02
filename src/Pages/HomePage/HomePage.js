import React from "react";
import { Paper, Button, Typography, Box, AppBar, Toolbar, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { TaskCard } from "../../Components/TaskCard/TaskCard";
import { formatTimeWithUnits } from "../../utils/formatTime";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

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

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box className="home-page-container">
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

      <Box className="content-wrapper">
        <Paper
          square
          elevation={0}
          className="header-container"
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
            className="accordion"
          >
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h6" fontWeight={600}>
                {project.projectName}
              </Typography>
              <Typography
                variant="body1"
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
                className="create-task-button"
                variant="contained"
                style={{ marginLeft: "auto" }}
              >
                Create task
              </Button>
              <Paper square elevation={0}>
                {project.tasks.map((item) => (
                  <Paper key={item.taskId} className="task-card">
                    <Typography className="task-card-title">{item.taskName}</Typography>
                    <Typography className="task-card-description">{item.description}</Typography>
                    <Box className="task-card-footer">
                      <Typography>Priority: {item.priority}</Typography>
                      <Typography>Duration: {formatTimeWithUnits(item.duration)}</Typography>
                    </Box>
                  </Paper>
                ))}
              </Paper>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
