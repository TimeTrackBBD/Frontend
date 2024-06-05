import { Box, Typography } from "@mui/material";
import { formatTimeWithUnits } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import React from "react";
import { getPriority } from "../../utils/utils";

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
    navigate("/timer", { state: { task } });
  };

  const priority = getPriority(task?.priorityId);

  return (
    <>
      <Paper key={task?.taskId} className="task-card">
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography variant="h6" fontWeight={700} className="task-card-title" alignContent="center">
            {task.taskName}
          </Typography>
        </Box>
        <Box sx={{ cursor: "pointer" }} onClick={() => handleButtonClick(task)}>
          <Typography className="task-card-description">
            Description: {task.description}
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
    </>
  );
};