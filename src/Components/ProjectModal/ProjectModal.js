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
import "./ProjectModal.css";
import { createProject, editProject } from "../../api/api";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const ProjectModal = ({ isOpen, handleModalClose, edit, project }) => {
  const [projectName, setProjectName] = React.useState("");
  const [projectNameValid, setProjectNameValid] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [descriptionValid, setDescriptionValid] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [errorChecking, setErrorChecking] = React.useState(false);

  React.useEffect(() => {
    if (edit && project) {
      setProjectName(project?.projectName);
      setDescription(project?.description);
    }
  }, [edit, project]);

  const handleClose = () => {
    setProjectNameValid(false);
    setDescriptionValid(false);
    setProjectName("");
    setDescription("");
    setErrorChecking(false);
    handleModalClose();
  };

  const handleProjectNameChange = (val) => {
    setProjectName(val.target.value);
  };

  const handleProjectDescriptionChange = (val) => {
    setDescription(val.target.value);
  };

  React.useEffect(() => {
    setProjectNameValid(!!projectName);
  }, [projectName]);

  React.useEffect(() => {
    setDescriptionValid(!!description);
  }, [description]);

  const handleButtonClick = async () => {
    setErrorChecking(true);
    setLoading(true);
    if (projectNameValid && descriptionValid) {
      try {
        //TODO: Get the user ID
        if (edit) {
          await editProject(1, project?.projectId, projectName, description);
        } else {
          await createProject(1, projectName, description);
        }
      } catch (error) {
        console.error("Error creating project", error);
      } finally {
        setLoading(false);
        handleClose();
      }
    }
  };

  return (
    <BootstrapDialog onClose={handleClose} open={isOpen}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {!edit ? "Create new project" : "Edit project"}
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
            label="Project name"
            variant="outlined"
            value={projectName}
            disabled={loading}
            fullWidth
            error={errorChecking && !projectNameValid}
            helperText={"Enter a project name"}
            onChange={(val) => handleProjectNameChange(val)}
          />
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            disabled={loading}
            fullWidth
            multiline
            error={errorChecking && !descriptionValid}
            helperText={"Enter a project description"}
            onChange={(val) => handleProjectDescriptionChange(val)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleButtonClick}
          disabled={loading}
          className="customButton"
        >
          {!edit ? "Create project" : "Edit project"}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
