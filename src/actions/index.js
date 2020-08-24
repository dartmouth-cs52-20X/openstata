import axios from 'axios';

const ROOT_URL = 'https://open-stata.herokuapp.com/api';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',

};

export function signinUser(user, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, user)
      .then((response) => {
        history.push('/home');
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        dispatch(`Sign In Failed: ${error.response.data}`);
      });
  };
}

export function signupUser({ email, password, username }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, username })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
      })
      .then(history.push('/home'))
      .catch((error) => {
        dispatch(`Sign Up Failed: ${error.response.data}`);
      });
  };
}

export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}
