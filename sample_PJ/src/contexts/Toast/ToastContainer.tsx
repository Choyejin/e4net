import React, { FC } from "react";
import { createPortal } from "react-dom";
import { Color } from '@material-ui/lab';

import Toast from "./Toast";

type Props = {
  content: string;
  severity: Color;
  open: boolean;
  setOpen: (open: boolean) => void;
}
const ToastContainer: FC<Props> = ({ content, severity, open, setOpen }) => {
  return createPortal(
    <Toast
      content={content}
      severity={severity}
      open={open}
      setOpen={setOpen}
    />,
    document.body
  );
};

export default ToastContainer;
