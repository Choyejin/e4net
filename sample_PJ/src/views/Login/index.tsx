import React, { useState, useEffect, ChangeEvent } from 'react';
import { useToast } from '../../contexts/Toast';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Button,Avatar,TextField,FormControlLabel,Checkbox,Container,Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import client from '../../lib/CommonApi/client';

const CARD_ADMIN_URL = `http://${document.location.host}`;

const useStyles = makeStyles((theme:any) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [loginData, setLoginData] = useState({
    loginId: "",
    loginPassword: ""
  });
  const { showToast } = useToast();

  const isAuthed = !(window.sessionStorage.getItem('token') == null);

  if (isAuthed) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const login = async() => {
    // login api 호출
    // await client.post(`/adm/login`, loginData).then(res => {
    //   if ('0000' === res.data.code) {
    //     window.sessionStorage.setItem("token", res.data.response);
    //     const loginUri = `${CARD_ADMIN_URL}/`;
    //     window.location.replace(loginUri);
    //   } else {
    //     alert('[' + res.data.code + '] ' + res.data.message);
    //   }
    // }).catch(e => {
    //   console.log(e);
    // });
    if(loginData.loginId === "e4net" && loginData.loginPassword === "e4net"){
      const loginUri = `/sample-search`;
      window.location.replace(loginUri);
      window.sessionStorage.setItem("token", "abcdefg1234234");
    } else {
      showToast('다시 입력해주세요', 'error');
    }
  };

  const onKeyEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      login();
    }
  };

  return (
<Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Sample Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="loginId"
            label="ID"
            name="loginId"
            onChange={handleChange}
            onKeyPress={onKeyEnter}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="loginPassword"
            label="PASSWORD"
            type="password"
            id="loginPassword"
            onChange={handleChange}
            onKeyPress={onKeyEnter}
            autoComplete="current-password"
          />          
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => login()}
            className={classes.submit}
          >
            Sign In
          </Button>
          
        </form>
      </div>
      </Container>    
   
  );
};

export default Login;
