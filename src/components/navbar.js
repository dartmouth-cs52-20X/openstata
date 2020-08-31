/* eslint-disable comma-dangle */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Home from '@material-ui/icons/Home';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { signoutUser, saveDoFile, getDoFiles } from '../actions';

import logo from '../assets/openstata_logo.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  input: {
    color: '#d2d2d2',
  },
}));

const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
});

const NavBar = (props) => {
  const classes = useStyles();
  const [filename, setFilename] = useState('');
  const [editFilename, setEditFilename] = useState(false);

  useEffect(() => {
    if (props.file) setFilename(props.file.fileName);
  }, [props.file]);

  const handleSignout = () => {
    props.signoutUser(props.history);
  };

  const updateSidebar = () => {
    props.getDoFiles(null);
  };

  const handleSave = () => {
    if (props.file.fileName !== filename) {
      const post = {
        fileName: filename,
        content: props.file.content,
      };
      props.saveDoFile(post, props.file.id, updateSidebar);
    }
    setEditFilename(false);
  };

  const handleExit = () => {
    props.history.push('/home');
  };

  const goToProfile = () => {
    props.history.push('/profile');
  };

  const openSignin = () => {
    props.history.push('/signin');
  };

  const openSignup = () => {
    props.history.push('/signup');
  };

  return (
    <AppBar position="fixed" className={classes.appBar} color="secondary">
      <Grid container direction="row" justify="space-between">
        <Grid item className="logo">
          <Link to="/home">
            <img src={logo} alt="logo" className="logoImg" />
          </Link>
        </Grid>
        {props.page === 'editor' ? (
          editFilename ? (
            <Grid className="filename">
              <Input
                color="primary"
                value={filename}
                onChange={(e) => {
                  setFilename(e.target.value);
                }}
                inputProps={{
                  className: classes.input,
                }}
              />
              <IconButton onClick={() => handleSave()} color="primary">
                <Save />
              </IconButton>
            </Grid>
          ) : (
            <Grid className="filename">
              <Typography variant="h6" color="primary">
                {filename}
              </Typography>
              {props.isLog ? undefined : (
                <IconButton
                  onClick={() => setEditFilename(true)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
              )}
            </Grid>
          )
        ) : undefined}
        {!props.authenticated ? (
          <Grid item>
            <IconButton onClick={openSignup} color="primary">
              <Typography variant="body1">Sign Up</Typography>
            </IconButton>
            <IconButton onClick={openSignin} color="primary">
              <Typography variant="body1">Log In</Typography>
            </IconButton>
          </Grid>
        ) : (
          <Grid item>
            {props.page === 'editor' ? (
              <IconButton onClick={handleExit} color="primary">
                <Home />
                <Typography variant="body1">Return Home</Typography>
              </IconButton>
            ) : undefined}
            <IconButton onClick={handleSignout} color="primary">
              <ExitToApp />
              <Typography variant="body1">Log Out</Typography>
            </IconButton>
            <IconButton onClick={goToProfile} color="primary">
              <AccountCircleIcon />
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

export default withRouter(
  connect(mapStateToProps, { signoutUser, saveDoFile, getDoFiles })(NavBar)
);
