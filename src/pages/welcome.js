import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

/* import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid'; */
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';
import Computer from '@material-ui/icons/Computer';

import NavBar from '../components/navbar';

const Welcome = (props) => {
  return (
    <div>
      <NavBar />
      <div id="welcome-box">
        <h1>Open Stata</h1>
        <h2>
          An online, open-source text editor and tutorial for learning Stata
        </h2>
        { !props.authenticated ? (
          <div>
            <IconButton component={NavLink} to="/signup">
              <Typography variant="body1">Sign Up</Typography>
              <Person />
            </IconButton>
            <IconButton component={NavLink} to="/signin">
              <Typography variant="body1">Sign In</Typography>
              <Person />
            </IconButton>
          </div>
        ) : (
          <IconButton component={NavLink} to="/home">
            <Typography variant="body1">Go to homepage </Typography>
            <Computer />
          </IconButton>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
});

export default connect(mapStateToProps, null)(Welcome);
