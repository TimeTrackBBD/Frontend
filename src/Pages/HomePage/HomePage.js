import React, { useState } from "react";
import {
  Paper,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { formatTimeWithUnits } from "../../utils/formatTime";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { ProjectModal } from "../../Components/ProjectModal/ProjectModal";
import { TaskModal } from "../../Components/TaskModal/TaskModal";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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
  { projectName: "Sanlam", description: "The business stuff", tasks: tasks },
  {
    projectName: "Grad Program",
    description: "The education stuff",
    tasks: tasks,
  },
  {
    projectName: "Personal project",
    description: "The fun stuff",
    tasks: tasks,
  },
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

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditProject, setIsEditProject] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState();

  const handleProjectModalOpen = (edit, project) => {
    setIsEditProject(edit);
    setProjectToEdit(project ?? null);
    setIsProjectModalOpen(true);
  };
  const handleTaskModalOpen = () => {
    setIsTaskModalOpen(true);
  };

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

      <Box className="content-wrapper">
        <Paper square elevation={0} className="header-container">
          <Typography variant="h5" fontWeight={600}>
            Your projects
          </Typography>
          <Button
            style={{ marginLeft: "auto" }}
            variant="contained"
            color="success"
            onClick={() => handleProjectModalOpen(false, null)}
          >
            Create new project
          </Button>
        </Paper>

        {projects.map((project, index) => (
          <Accordion key={index} className="accordion">
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h6" fontWeight={600}>
                {project.projectName}
              </Typography>
              <IconButton
                sx={{
                  color: "black",
                  padding: 0,
                  cursor: "pointer",
                }}
                onClick={() => handleProjectModalOpen(true, project)}
                color="primary"
                aria-label="edit"
              >
                <EditIcon
                  sx={{
                    paddingLeft: "0.2rem",
                    fontSize: "1.3rem",
                    display: "flex",
                    justifySelf: "center",
                  }}
                />
              </IconButton>
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
                onClick={handleTaskModalOpen}
              >
                Create task
              </Button>
              <Paper square elevation={0}>
                {project.tasks.map((item) => (
                  <Paper key={item.taskId} className="task-card">
                    <Typography className="task-card-title">
                      {item.taskName}
                    </Typography>
                    <Typography className="task-card-description">
                      {item.description}
                    </Typography>
                    <Box className="task-card-footer">
                      <Typography>Priority: {item.priority}</Typography>
                      <Typography>
                        Duration: {formatTimeWithUnits(item.duration)}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Paper>
            </AccordionDetails>
          </Accordion>
        ))}
        <ProjectModal
          isOpen={isProjectModalOpen}
          setIsOpen={setIsProjectModalOpen}
          edit={isEditProject}
          project={projectToEdit}
        />
        <TaskModal
          isOpen={isTaskModalOpen}
          setIsOpen={setIsTaskModalOpen}
          edit={false}
        />
      </Box>
    </Box>
  );
};
