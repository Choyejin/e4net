import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/styles";
import validate from "validate.js";
import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import validators from "./common/validators";
import Routes from "./Routes";
import { ToastProvider } from "./contexts/Toast";
import { DialogProvider } from "./contexts/Dialog";

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component<{}, {}> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <DialogProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </ToastProvider>
        </DialogProvider>
      </ThemeProvider>
    );
  }
}
