import { Box, Typography } from "@mui/material";
import { formatTimeWithUnits } from "../utils/formatTime";
import { useNavigate } from "react-router-dom";

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

export const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const handleButtonClick = (task) => {
    console.log(task);
    navigate(`/timer/${task.taskId}`, { state: { task } });
  };
  return (
    <Box
      sx={{
        margin: "0.5rem",
        padding: "1rem",
        background: "#eeeeee",
        borderRadius: "1rem",
        display: "inline-block",
        cursor: "pointer",
        boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)",
      }}
      key={task.taskId}
      onClick={() => {
        handleButtonClick(task);
      }}
    >
      <Typography
        variant="h7"
        fontWeight={600}
        sx={{ textDecoration: "underline" }}
      >
        {task.taskName}
      </Typography>
      <Typography>
        {"Time spent: " + formatTimeWithUnits(task.duration)}
      </Typography>
      <Typography color={getPriorityColor(task.priority)}>
        {"Priority: " + task.priority}
      </Typography>
    </Box>
  );
};
