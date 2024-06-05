import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
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
import { createTask, editTask } from "../../api/api";
import { getPriorityId, getPriority } from "../../utils/utils";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const TaskModal = ({
  isOpen,
  handleModalClose,
  setIsModalOpen,
  task,
  project,
  setProjects,
}) => {
  const [taskName, setTaskName] = React.useState();
  const [taskNameValid, setTaskNameValid] = React.useState(false);
  const [description, setDescription] = React.useState();
  const [descriptionValid, setDescriptionValid] = React.useState(false);
  const [priority, setPriority] = React.useState("Medium");
  const [priorityValid, setPriorityValid] = React.useState(false);
  const [errorChecking, setErrorChecking] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    if (task) {
      setTaskName(task.taskName);
      setDescription(task.description);
      setPriority(getPriority(task?.priority));
    }
  }, [task]);

  const handleClose = () => {
    setTaskNameValid(false);
    setDescriptionValid(false);
    setPriority(false);
    setErrorChecking(false);
    if (task) {
      setProjects((prevProjects) =>
        prevProjects.map((proj) =>
          proj.projectId === project?.projectId
            ? {
                ...proj,
                tasks: proj.tasks.map((t) =>
                  t.taskId === task?.taskId
                    ? {
                        ...t,
                        taskName: taskName,
                        description: description,
                        priority: getPriorityId(priority),
                      }
                    : t
                ),
              }
            : proj
        )
      );
    }
    handleModalClose();
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
    setTaskNameValid(
      !!taskName && taskName.length > 2 && taskName.length < 100
    );
  }, [taskName]);

  React.useEffect(() => {
    setDescriptionValid(!!description) &&
      description.length > 2 &&
      description.length < 500;
  }, [description]);

  //TODO: Better validation
  React.useEffect(() => {
    setPriorityValid(!!priority);
  }, [priority]);

  const handleButtonClick = async () => {
    setErrorChecking(true);

    if (taskNameValid && descriptionValid && priorityValid) {
      setLoading(true);
      setIsError(false);
      const priorityId = getPriorityId(priority);
      try {
        if (task) {
          await editTask(
            task?.taskId,
            task?.projectId,
            taskName,
            description,
            priorityId,
            task?.duration
          );
        } else {
          await createTask(
            project?.projectId,
            taskName,
            description,
            priorityId
          );
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
        setIsSaveDialogOpen(true);
      }
    }
  };

  return (
    <>
      <BootstrapDialog onClose={() => setIsModalOpen(false)} open={isOpen}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {!task ? "Create new task" : "Edit task"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setIsModalOpen(false)}
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
              disabled={loading}
              fullWidth
              error={errorChecking && !taskNameValid}
              helperText={
                errorChecking && !taskNameValid
                  ? "Task name must be between 2 and 100 characters"
                  : "Enter a task name"
              }
              onChange={(val) => handleTaskNameChange(val)}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              disabled={loading}
              fullWidth
              multiline
              error={errorChecking && !descriptionValid}
              helperText={
                errorChecking && !descriptionValid
                  ? "Task description must be between 2 and 500 characters"
                  : "Enter a task description."
              }
              onChange={(val) => handleDescriptionChange(val)}
            />
            <Select
              value={priority}
              label="Priority"
              onChange={handlePriorityChange}
              disabled={loading}
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
          <Button
            autoFocus
            onClick={handleButtonClick}
            disabled={loading}
            className="customButton"
          >
            {!task ? "Create task" : "Edit task"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <Dialog open={isSaveDialogOpen} type>
        <DialogTitle id="alert-dialog-title">
          {isError ? "Error" : "Saved"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isError ? "Unable to save task. Please try again." : "Task saved!"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            autoFocus
            onClick={() => {
              setIsSaveDialogOpen(false);
              handleClose();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
