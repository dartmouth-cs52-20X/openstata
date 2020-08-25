import axios from 'axios';

const ROOT_URL = 'https://open-stata.herokuapp.com/api';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  GET_DOFILES: 'GET_DOFILES',
};

export function signinUser(user, history) {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/signin`, user)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: ActionTypes.AUTH_USER });
        history.push('/home');
      })
      .catch((error) => {
        dispatch(`Sign In Failed: ${error.response.data}`);
      });
  };
}

export function signupUser({ email, password, username }, history, onError) {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/signup`, { email, password, username })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: ActionTypes.AUTH_USER });
        history.push('/home');
      })
      .catch((error) => {
        dispatch(`Sign Up Failed: ${error.response.data}`);
        onError();
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

export const getDoFiles = () => (dispatch) => {
  console.log('getting dofiles');
  axios
    .get(`${ROOT_URL}/dofiles`)
    .then((res) => {
      console.log('response', res);
      dispatch({
        type: ActionTypes.GET_DOFILES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
