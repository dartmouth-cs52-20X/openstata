/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

import { signoutUser } from '../actions';
import logo from '../assets/openstata_logo.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const [editFilename, setEditFilename] = useState(false);

  const handleSignout = () => {
    props.signoutUser(props.history);
  };

  const handleExit = () => {
    props.history.push('/home');
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Grid container direction="row" justify="space-between">
        <Grid item className="logo">
          <img src={logo} alt="logo" className="logoImg" />
        </Grid>
        {props.page === 'editor' ? (
          editFilename ? (
            <Grid className="filename">
              <Typography variant="h6">{props.fileName}</Typography>
              <IconButton onClick={() => setEditFilename(false)}>
                <Save />
              </IconButton>
            </Grid>
          ) : (
            <Grid className="filename">
              <Typography variant="h6">{props.fileName}</Typography>
              <IconButton onClick={() => setEditFilename(true)}>
                <Edit />
              </IconButton>
            </Grid>
          )
        ) : undefined}
        {!props.authenticated ? (
          <Grid item>
            <IconButton>
              <Typography variant="body1">Sign Up</Typography>
            </IconButton>
            <IconButton>
              <Typography variant="body1">Log In</Typography>
            </IconButton>
          </Grid>
        ) : (
          <Grid item>
            {props.page === 'editor' ? (
              <IconButton onClick={handleExit}>
                <Home />
                <Typography variant="body1">Return Home</Typography>
              </IconButton>
            ) : undefined}
            <IconButton onClick={handleSignout}>
              <ExitToApp />
              <Typography variant="body1">Log Out</Typography>
            </IconButton>
            <IconButton>
              <AccountCircle />
              <Typography variant="body1">Profile</Typography>
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

export default withRouter(connect(mapStateToProps, { signoutUser })(NavBar));
