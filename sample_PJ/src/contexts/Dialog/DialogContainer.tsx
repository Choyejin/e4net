import React, { FC } from "react";
import { createPortal } from "react-dom";

import Dialog from "./Dialog";

type Props = {
  title: string;
  context: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: (...args: any[]) => void;
}

const DialogContainer: FC<Props> = ({ title, context, open, setOpen, onConfirm }) => {
  return createPortal(
    <Dialog
      title={title}
      context={context}
      open={open}
      setOpen={setOpen}
      onConfirm={onConfirm}
    />,
    document.body
  );
};

export default DialogContainer;
