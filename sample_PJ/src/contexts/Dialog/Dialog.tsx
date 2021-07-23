import React, { FC } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

type Props = {
  title: string;
  context: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: (...args: any[]) => void;
}

const ConfirmDialog: FC<Props> = ({ title, context, open, setOpen, onConfirm }) => {
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {context}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          취소
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog 