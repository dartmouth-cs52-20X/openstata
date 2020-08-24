import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import LockOpen from '@material-ui/icons/LockOpen';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { makeStyles } from '@material-ui/core/styles';


const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

const NavBar = (props) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Grid container direction="row" justify="space-between">
        <Grid item className="logo">
          <LockOpen />
          <Typography varient="body1">Open Stata</Typography>
        </Grid>
        {props.page === 'landing' ? (
          <Grid item>
            <IconButton>
              <Typography varient="body1">Sign Up</Typography>
            </IconButton>
            <IconButton>
              <Typography varient="body1">Log In</Typography>
            </IconButton>
          </Grid>
        ) : (
          <Grid item>
            <IconButton>
              <ExitToApp />
              <Typography varient="body1">Log Out</Typography>
            </IconButton>
            <IconButton>
              <AccountCircle />
              <Typography varient="body1">Profile</Typography>
            </IconButton>
          </Grid>
        )}
      </Grid>
    </AppBar>
  );
};

export const FillerBar = () => {
  return (
    <AppBar position="static">
      <IconButton>
        <ChevronLeft />
      </IconButton>
    </AppBar>
  );
};

const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
});

export default withStyles(styles)(withRouter(connect(mapStateToProps, { signoutUser })(NavBar)));
