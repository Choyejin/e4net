import React, { FC, useState, useContext, useCallback, ReactNode } from "react";
import DialogContainer from "./DialogContainer";

export interface DialogContextInterface {
  showDialog: (content: any, severity: any) => void;
}

const DialogContext = React.createContext<any | null>(null);
type Props = {
  children: ReactNode
}
const DialogProvider: FC<Props> = ({ children }) => {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});
  const [DialogOpen, setDialogOpen] = useState(false);

  const showDialog = useCallback(
    (title, context, onConfirm) => {
      setTitle(title);
      setContext(context);
      // eslint-disable-next-line
      setOnConfirm(() => {
        return onConfirm;
      });
      setDialogOpen(true);
    },
    [setContext, setTitle, setDialogOpen]
  );

  const hideDialog = useCallback(
    () => setDialogOpen(false),
    [setDialogOpen]
  );

  return (
    <DialogContext.Provider
      value={{
        showDialog,
        hideDialog
      }}
    >
      <DialogContainer context={context} title={title} open={DialogOpen} setOpen={setDialogOpen} onConfirm={onConfirm}/>
      {children}
    </DialogContext.Provider>
  );
};

const useDialog = () => {
  return useContext(DialogContext);
};

export { DialogContext, useDialog };
export default DialogProvider;
