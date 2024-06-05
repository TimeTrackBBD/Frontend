import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import React from "react";
import { Button } from "@mui/material";

export const PopupDialogue = ({
  isOpen,
  onClick,
  title,
  content,
  primaryButtonText,
}) => {
  return (
    <Dialog open={isOpen} type>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          autoFocus
          onClick={() => {
            onClick();
          }}
        >
          {primaryButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
