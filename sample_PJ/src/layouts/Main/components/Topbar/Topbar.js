import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  topBarTitle: {
    color: '#FFFFFF',
    display: 'flex',
    'align-items': 'center',
    'padding-left': '10px'
  },
  logo: {
    display: 'inline-block',
    'vertical-align': 'middle',
    height: '35px',
    width: '100px'
  },
  routerLink: {
    display: 'inline-flex'
  },
  logoutButton: {
    display: 'flex',
    color: '#FFFFFF',
    float: 'right'
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink
          className={classes.routerLink}
          to="/"
        >
          <img
            alt="Logo"
            className={classes.logo}
            src="/images/logos/product_5.png"
          />
          <h4 className={classes.topBarTitle}> Admin </h4>
        </RouterLink>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <div className={classes.flexGrow} />
        <RouterLink
          className={classes.logoutButton}
          to="/logout"
        >
          Logout
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
