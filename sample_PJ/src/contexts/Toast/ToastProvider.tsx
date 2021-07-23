import React, { FC, useState, useContext, useCallback, ReactNode } from "react";
import ToastContainer from "./ToastContainer";
import { Color } from '@material-ui/lab';

export interface ToastContextInterface {
  showToast: (content: any, severity: any) => void;
}

const ToastContext = React.createContext<any | null>(null);
type Props = {
  children: ReactNode
}
const ToastProvider: FC<Props> = ({ children }) => {
  const [content, setContent] = useState('');
  const [severity, setSeverity] = useState<Color>('error');
  const [toastOpen, setToastOpen] = useState(false);

  const showToast = useCallback(
    (content, severity) => {
      setContent(content);
      setSeverity(severity);
      setToastOpen(true);
    },
    [setContent, setSeverity]
  );

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      <ToastContainer content={content} severity={severity} open={toastOpen} setOpen={setToastOpen}/>
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const toastHelpers = useContext(ToastContext);

  return toastHelpers;
};

export { ToastContext, useToast };
export default ToastProvider;
