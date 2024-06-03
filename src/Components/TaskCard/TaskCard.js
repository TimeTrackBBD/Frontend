import { Box, Typography } from "@mui/material";
import { formatTimeWithUnits } from "../../utils/formatTime";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Paper } from "@mui/material";
import { TaskModal } from "../TaskModal/TaskModal";
import React from "react";

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

//TODO: Instead of passing the task, we pass the taskID and then perform an API call and show a loader until we get a response
export const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const handleButtonClick = (task) => {
    navigate("/timer", { state: { task } });
  };
  const [isTaskModalOpen, setIsTaskModalOpen] = React.useState(false);

  const handleTaskModalOpen = () => {
    setIsTaskModalOpen(true);
  };

  //TODO: Convert priority ID to priority

  return (
    <Box
      sx={{
        margin: "0.5rem",
        padding: "1rem",
        background: "#eeeeee",
        borderRadius: "1rem",
        display: "inline-block",
        boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)",
      }}
      key={task.taskId}
    >
      <Paper
        square
        elevation={0}
        sx={{
          background: "inherit",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h7"
          fontWeight={600}
          sx={{ textDecoration: "underline", alignSelf: "center" }}
        >
          {task.taskName}
        </Typography>
        <IconButton
          sx={{
            marginLeft: "auto",
            color: "black",
            padding: 0,
            cursor: "pointer",
          }}
          onClick={handleTaskModalOpen}
          color="primary"
          aria-label="edit"
          style={{ fontSize: "24px" }}
        >
          <EditIcon />
        </IconButton>
      </Paper>
      <Paper
        square
        elevation={0}
        sx={{
          background: "inherit",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          handleButtonClick(task);
        }}
      >
        <Typography>
          {"Time spent: " + formatTimeWithUnits(task.duration)}
        </Typography>
        <Typography color={getPriorityColor(task.priority)}>
          {"Priority: " + task.priority}
        </Typography>
      </Paper>

      <TaskModal
        isOpen={isTaskModalOpen}
        setIsOpen={setIsTaskModalOpen}
        edit={true}
        task={task}
      />
    </Box>
  );
};
