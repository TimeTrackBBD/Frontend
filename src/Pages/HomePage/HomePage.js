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
import { getProjects, getTasksByProjectId, deleteProject } from "../../api/api";
import { TaskCard } from "../../Components/TaskCard/TaskCard";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import { PopupDialogue } from "../../Components/Dialogue/PopupDialogue";

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
  const [isDeleteProjectDialogOpen, setIsDeleteProjectDialogOpen] =
    useState(false);
  const [isDeleteCompleteDialogOpen, setIsDeleteCompleteDialogOpen] =
    useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [isCanNotDeleteDialogOpen, setIsCanNotDeleteDialogOpen] =
    useState(false);
  const [activeProject, setActiveProject] = useState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleProjectModalOpen = (edit, project) => {
    setIsEditProject(edit);
    setActiveProject(project ?? null);
    setIsProjectModalOpen(true);
  };

  const handleProjectModalClose = () => {
    setIsProjectModalOpen(false);
    setProjects([]);
    fetchProjects();
  };

  const handleTaskModalOpen = (project) => {
    setActiveProject(project ?? null);
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
          <Button sx={{ visibility: "hidden" }}>Back</Button>
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
              className="create-project-button"
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
                      color: "#01013e",
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
                  <IconButton
                    sx={{
                      color: "#01013e",
                      padding: 0,
                      cursor: "pointer",
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (project?.tasks?.length > 0) {
                        setIsCanNotDeleteDialogOpen(true);
                      } else {
                        setActiveProject(project);
                        setIsDeleteProjectDialogOpen(true);
                      }
                    }}
                    color="primary"
                    aria-label="delete"
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

                  <Paper square elevation={0}>
                    {!!project?.tasks.length > 0 ? (
                      project?.tasks.map((task) => (
                        <TaskCard
                          task={task}
                          project={project}
                          setProjects={setProjects}
                        ></TaskCard>
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
            project={activeProject}
          />
          <TaskModal
            isOpen={isTaskModalOpen}
            handleModalClose={handleTaskModalClose}
            setIsModalOpen={setIsTaskModalOpen}
            edit={false}
            project={activeProject}
          />
          <PopupDialogue
            isOpen={isDeleteProjectDialogOpen}
            onClick={async () => {
              const response = await deleteProject(activeProject?.projectId);

              if (response.status == 204) {
                setIsDeleteError(false);
                setIsDeleteProjectDialogOpen(false);
              } else {
                setIsDeleteError(true);
                setIsDeleteProjectDialogOpen(false);
              }
              setIsDeleteCompleteDialogOpen(true);
            }}
            title={"Are you sure?"}
            content={
              "Are you sure you want to delete this project? It can not be undone."
            }
            primaryButtonText={"Ok"}
          />
          <PopupDialogue
            isOpen={isCanNotDeleteDialogOpen}
            onClick={() => {
              setIsCanNotDeleteDialogOpen(false);
            }}
            title={"Alert!"}
            content={"You can only delete a project that has no tasks!"}
            primaryButtonText={"Ok"}
          />
          <PopupDialogue
            isOpen={isDeleteCompleteDialogOpen}
            onClick={() => {
              if (!isDeleteError) {
                setProjects((prevProjects) =>
                  prevProjects.filter(
                    (project) => project.projectId !== activeProject?.projectId
                  )
                );
              }
              setIsDeleteCompleteDialogOpen(false);
              setIsDeleteError(false);
            }}
            title={isDeleteError ? "Error" : "Success"}
            content={
              isDeleteError
                ? "Failed to delete project. Please try again."
                : "Project successfully deleted."
            }
            primaryButtonText={"Ok"}
          />
        </Box>
      )}
    </Box>
  );
};
