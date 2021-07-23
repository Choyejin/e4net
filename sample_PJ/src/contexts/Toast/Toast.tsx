import React, { FC } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, Color } from '@material-ui/lab';

type Props = {
  content: string;
  severity: Color;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Toast: FC<Props> = ({ content, severity, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity={severity}>
        {content}
      </Alert>
    </Snackbar>
  )
}

export default Toast 