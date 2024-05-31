import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './InputModal.css'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const currencies = [
  {
    value: 'high',
    label: 'High',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'low',
    label: 'Low',
  }
];

export const InputModal = () => {
  const [open, setOpen] = React.useState(false);
  const [priority, setPriority] = React.useState('medium');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePriority = (event) => {
    setPriority(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="appBar">
        <Toolbar>
          <PendingActionsIcon className="pendingActionsIcon" />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className="timeTrackHeading">
            Timetrack
          </Typography>
          <Button variant="outlined" startIcon={<LogoutIcon />} className="customButton" size="medium">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Button variant="outlined" onClick={handleClickOpen} className="customButton centerButton">
        Create new task
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create new task
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form>
            <TextField id="project" label="Project" variant="outlined" fullWidth />
            <TextField id="taskName" label="Task name" variant="outlined" fullWidth />
            <Select
                id="priority"
                value={priority}
                onChange={handleChangePriority}
                label="Priority"
                variant="outlined"
                fullWidth
            >
        {currencies.map((option) => (
        <MenuItem key={option.value} value={option.value} className={`priority${option.label.charAt(0).toUpperCase() + option.label.slice(1)}`}>
            {option.label}
        </MenuItem>
    ))}
</Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} className="customButton">
            Track new task
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
};
