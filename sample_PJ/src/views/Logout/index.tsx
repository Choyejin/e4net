import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const CARD_ADMIN_URL = `https://${document.location.host}`;

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Logout = () => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error] = useState<Error>();


  window.sessionStorage.removeItem("token");   
  const loginUri = `/login`;
  window.location.replace(loginUri);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      window.sessionStorage.removeItem("token");    
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className={classes.root}>
      
    </div>
  );
};

export default Logout;
