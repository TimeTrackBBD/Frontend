import { Box, Typography } from "@mui/material";
import { formatTimeWithUnits } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import React from "react";
import { getPriority } from "../../utils/utils";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PopupDialogue } from "../../Components/Dialogue/PopupDialogue";
import { deleteTask } from "../../api/api";
import EditIcon from "@mui/icons-material/Edit";
import { TaskModal } from "../../Components/TaskModal/TaskModal";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "Red";
    case "Medium":
      return "Orange";
    default:
      return "Green";
  }
};

export const TaskCard = ({ task, project, setProjects }) => {
  const navigate = useNavigate();

  const [isDeleteDialogueOpen, setIsDeleteDialogueOpen] = React.useState(false);
  const [isDeleteCompleteDialogOpen, setIsDeleteCompleteDialogOpen] =
    React.useState(false);
  const [isDeleteError, setIsDeleteError] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const handleButtonClick = (task) => {
    navigate("/timer", { state: { task } });
  };

  const priority = getPriority(task?.priorityId);

  return (
    <>
      <Paper key={task?.taskId} className="task-card">
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            variant="h6"
            fontWeight={700}
            className="task-card-title"
            alignContent="center"
          >
            {task.taskName}
          </Typography>
          <IconButton
            sx={{
              color: "#01013e",
              padding: 0,
              cursor: "pointer",
            }}
            onClick={(event) => {
              event.stopPropagation();
              setIsEditModalOpen(true);
            }}
            color="primary"
            aria-label="delete"
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
              setIsDeleteDialogueOpen(true);
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
        </Box>
        <Box sx={{ cursor: "pointer" }} onClick={() => handleButtonClick(task)}>
          <Typography className="task-card-description">
            Description: {task?.description}
          </Typography>
          <Box className="task-card-footer">
            <Typography color={getPriorityColor(priority)}>
              Priority: {priority}
            </Typography>
            <Typography>
              Duration: {formatTimeWithUnits(task.duration)}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <PopupDialogue
        isOpen={isDeleteDialogueOpen}
        onClick={async () => {
          const response = await deleteTask(task?.taskId);

          if (response.status == 204) {
            setIsDeleteError(false);
            setIsDeleteDialogueOpen(false);
          } else {
            setIsDeleteError(true);
            setIsDeleteDialogueOpen(false);
          }
          setIsDeleteCompleteDialogOpen(true);
        }}
        title={"Are you sure?"}
        content={
          "Are you sure you want to delete this task? It can not be undone."
        }
        primaryButtonText={"Ok"}
      />
      <PopupDialogue
        isOpen={isDeleteCompleteDialogOpen}
        onClick={() => {
          if (!isDeleteError) {
            setProjects((prevProjects) =>
              prevProjects.map((proj) =>
                proj.projectId === project?.projectId
                  ? {
                      ...proj,
                      tasks: proj.tasks.filter(
                        (t) => t.taskId !== task?.taskId
                      ),
                    }
                  : proj
              )
            );
          }
          setIsDeleteCompleteDialogOpen(false);
          setIsDeleteError(false);
        }}
        title={isDeleteError ? "Error" : "Success"}
        content={
          isDeleteError
            ? "Failed to delete task. Please try again."
            : "Task successfully deleted."
        }
        primaryButtonText={"Ok"}
      />
      <TaskModal
        isOpen={isEditModalOpen}
        handleModalClose={() => {
          setIsEditModalOpen(false);
        }}
        setIsModalOpen={setIsEditModalOpen}
        edit={true}
        project={project}
        task={task}
        setProjects={setProjects}
      />
    </>
  );
};
