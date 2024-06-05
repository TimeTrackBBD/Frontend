import React, { useEffect, useState } from "react";
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { formatTimeWithUnits } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { ProjectModal } from "../../Components/ProjectModal/ProjectModal";
import { TaskModal } from "../../Components/TaskModal/TaskModal";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getProjectsByUserId, getTasksByProjectId } from "../../api/api";
import { TaskCard } from "../../Components/TaskCard/TaskCard";
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [projects, setProjects] = useState([]);

  const handleProjectModalOpen = (edit, project) => {
    setIsEditProject(edit);
    setProjectToEdit(project ?? null);
    setIsProjectModalOpen(true);
  };

  const handleProjectModalClose = () => {
    setIsProjectModalOpen(false);
    setProjects([]);
    fetchProjects();
  };

  const handleTaskModalOpen = (project) => {
    setProjectToEdit(project ?? null);
    setIsTaskModalOpen(true);
  };

  const handleTaskModalClose = () => {
    setIsTaskModalOpen(false);
    setProjects([]);
    fetchProjects();
  };

  const fetchTasks = async (projectId) => {
    try {
      const response = await getTasksByProjectId(projectId);
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await getProjectsByUserId(1);
      let project = {};
      for (let i = 1; i < response.length; i++) {
        project = response[i];
        let tasks = await fetchTasks(project["projectId"]);
        project["tasks"] = tasks;
        setProjects((prevProjects) => [...prevProjects, project]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // fetchProjects();
    setProjects([
      {
          projectId: 4,
          userId : 1,
          projectName : "Lovely stuff123",
          description: "Beautiful",
      tasks:[{
          taskId : 10,
          projectId: 4,
          priorityId: 2,
          taskName: "Test123333",
          description: "The bets description ever and I hope it breaks my website so much pls wbreak break break break! Lets make this even longer and longer!",
          duration: 15
      },
      {
          taskId: 11,
          projectId: 4,
          priorityId: 1,
          taskName: "The best one",
          description: "oh yeee",
          duration: 45
      }]
      }
  ])
  }, []);

  return (
    <Box className="home-page-container">
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
            onClick={() => {
              sessionStorage.clear();
              navigate("/");
            }}
            startIcon={<LogoutIcon />}
            className="logOut-button"
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
            className="create-project-button"
            onClick={() => handleProjectModalOpen(false, null)}
          >
            Create new project
          </Button>
        </Paper>

        {projects?.map((project, index) => (
          <Accordion key={index} className="accordion">
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h6" fontWeight={600}>
                {project.projectName}
              </Typography>
              <IconButton
                sx={{
                  color: "#01013e",
                  padding: 0,
                  cursor: "pointer",
                }}
                onClick={() => handleProjectModalOpen(true, project)}
                color="primary"
                aria-label="edit"
              >
                <EditIcon
                  sx={{
                    paddingLeft: "0.5rem",
                    fontSize: "1.3rem",
                    display: "flex",
                    justifySelf: "center",
                  }}
                />
              </IconButton>
              <IconButton
                sx={{
                  color: "#01013e",
                  padding: 0,
                  cursor: "pointer",
                }}
                onClick={() => handleProjectModalOpen(true, project)}
                color="primary"
                aria-label="edit"
              >
                <DeleteIcon
                  sx={{
                    paddingLeft: "0.5rem",
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
                onClick={() => handleTaskModalOpen(project)}
              >
                Create task
              </Button>
              <IconButton
                sx={{
                  color: "#01013e",
                  padding: 0,
                  cursor: "pointer",
                }}
                onClick={() => handleProjectModalOpen(true, project)}
                color="primary"
                aria-label="edit"
              >
                <DeleteIcon
                  sx={{
                    paddingLeft: "0.5rem",
                    fontSize: "1.3rem",
                    display: "flex",
                    justifySelf: "center",
                  }}
                />
              </IconButton>
              <Paper square elevation={0}>
                {project?.tasks.map((task) => (
                  //TODO: Allow user to edit task
                  <TaskCard task={task}></TaskCard>
                ))}
              </Paper>
            </AccordionDetails>
          </Accordion>
        ))}
        <ProjectModal
          isOpen={isProjectModalOpen}
          handleModalClose={handleProjectModalClose}
          edit={isEditProject}
          project={projectToEdit}
        />
        <TaskModal
          isOpen={isTaskModalOpen}
          handleModalClose={handleTaskModalClose}
          edit={false}
          project={projectToEdit}
        />
      </Box>
    </Box>
  );
};
