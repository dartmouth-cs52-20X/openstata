import React, { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';

import { changePassword } from '../actions';
import NavBar from '../components/navbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Profile(props) {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [editPassword, setEditPassword] = useState(false);
  const [error, setChangeError] = useState(false);
  const [passwordReqError, setPasswordReqError] = useState(false);

  const onError = () => {
    setChangeError(true);
  };

  const handlePasswordChange = () => {
    setChangeError(false);
    setPasswordReqError(
      !password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/),
    );

    if (!password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)) {
      console.log('Invalid password');
    } else {
      const passwordChange = { newPassword: password };
      props.changePassword(passwordChange, onError);
      setEditPassword(false);
    }
  };

  return (
    <div>
      <NavBar />
      <Container component="main" maxWidth="sm" className="profile-content">
        <div className="classes.paper">
          <Typography component="h1" variant="h5" align="center">
            Profile
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel className="username-fixed">
                  Username: {props.username}
                </InputLabel>
              </Grid>
              <Grid item xs={12}>
                <InputLabel className="email-fixed">
                  Email: {props.email}
                </InputLabel>
              </Grid>
            </Grid>
            {editPassword ? (
              <div>
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
                    error={passwordReqError}
                    helperText={
                        passwordReqError
                          ? 'You need at least 8 characters with one uppercase letter, one lowercase letter, and one number'
                          : 'Password must at least 8 characters long with 1 uppercase letter, 1 lowercase letter, and 1 number.'
                    }
                  />
                </Grid>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handlePasswordChange}
                >
                  Change Password
                </Button>
                <Grid container direction="row" justify="center">
                  {error ? (
                    <Typography variant="subtitle1">
                      Failed to change password. Please try again.
                    </Typography>
                  ) : undefined}
                </Grid>
              </div>
            ) : (
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={setEditPassword}
              >
                Edit Password
              </Button>
            )}
          </form>
        </div>
      </Container>
    </div>
  );
}

const mapStateToProps = (reduxState) => ({
  username: reduxState.auth.username,
  email: reduxState.auth.email,
});

export default connect(mapStateToProps, { changePassword })(Profile);
