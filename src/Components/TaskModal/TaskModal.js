import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import Select from "@mui/material/Select";
import "./TaskModal.css";
import { priorities } from "../../Models/priorities";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const TaskModal = ({ isOpen, setIsOpen, edit, task }) => {
  const [taskName, setTaskName] = React.useState();
  const [taskNameValid, setTaskNameValid] = React.useState(false);
  const [description, setDescription] = React.useState();
  const [descriptionValid, setDescriptionValid] = React.useState(false);
  const [priority, setPriority] = React.useState("Medium");
  const [priorityValid, setPriorityValid] = React.useState(false);
  const [errorChecking, setErrorChecking] = React.useState(false);

  React.useEffect(() => {
    if (edit && task) {
      setTaskName(task.taskName);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [edit, task]);

  const handleClose = () => {
    setTaskNameValid(false);
    setDescriptionValid(false);
    setPriority(false);
    setErrorChecking(false);
    setIsOpen(false);
  };

  const handleTaskNameChange = (val) => {
    setTaskName(val.target.value);
  };

  const handleDescriptionChange = (val) => {
    setDescription(val.target.value);
  };

  const handlePriorityChange = (val) => {
    setPriority(val.target.value);
  };

  React.useEffect(() => {
    setTaskNameValid(!!taskName);
  }, [taskName]);

  React.useEffect(() => {
    setDescriptionValid(!!description);
  }, [description]);

  React.useEffect(() => {
    setPriorityValid(!!priority);
  }, [priority]);

  const saveTask = () => {
    setErrorChecking(true);
    if (taskNameValid && descriptionValid && priorityValid) {
      //TODO: API CALL to save new task or edit existing one
      console.log(taskNameValid, description, priority);
      handleClose();
    }
  };

  return (
    <BootstrapDialog onClose={handleClose} open={isOpen}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {!edit ? "Create new task" : "Edit task"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: "0.5rem",
          top: "0.5rem",
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <form>
          <TextField
            label="Task name"
            variant="outlined"
            value={taskName}
            fullWidth
            error={errorChecking && !taskNameValid}
            helperText={"Enter a task name"}
            onChange={(val) => handleTaskNameChange(val)}
          />
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            fullWidth
            multiline
            error={errorChecking && !descriptionValid}
            helperText={"Enter a task description."}
            onChange={(val) => handleDescriptionChange(val)}
          />
          <Select
            value={priority}
            label="Priority"
            onChange={handlePriorityChange}
            error={errorChecking && !priorityValid}
            helperText={"Select a priority"}
            fullWidth
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={errorChecking && !priorityValid}>
            Select a priority
          </FormHelperText>
        </form>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={saveTask} className="customButton">
          {!edit ? "Create task" : "Edit task"}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
