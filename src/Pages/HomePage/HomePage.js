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
import { getProjects, getTasksByProjectId } from "../../api/api";
import { TaskCard } from "../../Components/TaskCard/TaskCard";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [loading, setLoading] = useState(false);

  const handleProjectModalOpen = (edit, project) => {
    setIsEditProject(edit);
    setProjectToEdit(project ?? null);
    setIsProjectModalOpen(true);
  };

  const handleProjectModalClose = () => {
    setIsProjectModalOpen(false);
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
      setLoading(true);
      const response = await getProjects();
      let project = {};
      for (let i = 0; i < response.length; i++) {
        project = response[i];
        let tasks = await fetchTasks(project["projectId"]);
        project["tasks"] = tasks;
        setProjects((prevProjects) => [...prevProjects, project]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Box className="home-page-container">
      <AppBar position="static" className="appBar">
        <Toolbar>
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
            className="customButton"
            size="medium"
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      {loading ? (
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="h5" fontWeight={600}>
            Loading your projects...
          </Typography>
        </section>
      ) : (
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
          {!!projects.length > 0 ? (
            projects?.map((project, index) => (
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
                    onClick={(event) => {
                      event.stopPropagation();
                      handleProjectModalOpen(true, project);
                    }}
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
                    onClick={() => handleTaskModalOpen(project)}
                  >
                    Create task
                  </Button>
                  <Paper square elevation={0}>
                    {!!project?.tasks.length > 0 ? (
                      project?.tasks.map((task) => (
                        <TaskCard task={task}></TaskCard>
                      ))
                    ) : (
                      <Typography
                        variant="h6"
                        textAlign="center"
                        marginTop="3rem"
                        padding="1rem"
                        justifyContent="center"
                        border={"0.3rem solid black"}
                        sx={{ background: "white" }}
                      >
                        No tasks found! Click the button to create a new one!
                      </Typography>
                    )}
                  </Paper>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography
              variant="h4"
              textAlign="center"
              marginTop="3rem"
              padding="1rem"
              justifyContent="center"
              border={"0.3rem solid black"}
              sx={{ background: "white" }}
            >
              No projects found! Click the button to create a new one!
            </Typography>
          )}

          <ProjectModal
            isOpen={isProjectModalOpen}
            handleModalClose={handleProjectModalClose}
            setIsModalOpen={setIsProjectModalOpen}
            setProjects={setProjects}
            projects={projects}
            edit={isEditProject}
            project={projectToEdit}
          />
          <TaskModal
            isOpen={isTaskModalOpen}
            handleModalClose={handleTaskModalClose}
            setIsModalOpen={setIsTaskModalOpen}
            edit={false}
            project={projectToEdit}
          />
        </Box>
      )}
    </Box>
  );
};
