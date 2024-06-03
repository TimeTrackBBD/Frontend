import { Box, Typography } from "@mui/material";
import { formatTimeWithUnits } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Paper } from "@mui/material";
import { TaskModal } from "../TaskModal/TaskModal";
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

//TODO: Instead of passing the task, we pass the taskID and then perform an API call and show a loader until we get a response
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
          <Typography variant="h6" fontWeight={700} className="task-card-title">
            {task.taskName}
          </Typography>
          {/* <IconButton
            sx={{
              color: "black",
              padding: 0,
              cursor: "pointer",
            }}
            onClick={() => openTaskModal()}
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
          </IconButton> */}
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
