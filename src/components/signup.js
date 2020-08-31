/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { signupUser } from '../actions';

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const onError = () => {
    setSignUpError(true);
  };

  const handleSignUp = () => {
    setSignUpError(false);
    // Input checking
    setUsernameError(username.trim() === '');
    setEmailError(email.trim() === '');
    setPasswordError(
      !password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)
    );

    // Cont'd
    if (
      username.trim() === '' ||
      email.trim() === '' ||
      !password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)
    ) {
      console.log('Invalid input');
    } else {
      // Arrange user data and make API call
      const user = {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      };
      props.signupUser(user, props.history, onError);
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter') {
        handleSignUp();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  });

  return (
    <div>
      <Container component="main" maxWidth="sm" className="signup-modal">
        <IconButton type="button" href="/">
          <CloseIcon />
        </IconButton>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="usename"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={(event) => setUsername(event.target.value)}
                  error={usernameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  error={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                  error={passwordError}
                  helperText={
                    passwordError
                      ? 'You need at least 8 characters with one uppercase letter, one lowercase letter, and one number'
                      : 'Password must at least 8 characters long with 1 uppercase letter, 1 lowercase letter, and 1 number.'
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center">
              {signUpError ? (
                <Typography variant="subtitle1">
                  Error during sign up. Please try again.
                </Typography>
              ) : undefined}
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default withRouter(connect(null, { signupUser })(SignUp));
