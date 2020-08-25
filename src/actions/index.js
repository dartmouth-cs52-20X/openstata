import axios from 'axios';

const ROOT_URL = 'https://open-stata.herokuapp.com/api';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  GET_DOFILES: 'GET_DOFILES',
  CREATE_DOFILE: 'CREATE_DOFILE',
  GET_SINGLE_DOFILE: 'GET_SINGLE_DOFILE',
  SAVE_DOFILE: 'SAVE_DOFILE',
  DELETE_DOFILE: 'DELETE_DOFILE',
};

export function signinUser(user, history) {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/signin`, user)
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

export function signupUser({ email, password, username }, history, onError) {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/signup`, { email, password, username })
      .then((response) => {
        history.push('/home');
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
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
  axios
    .get(`${ROOT_URL}/dofiles`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      console.log('response', res.data);
      dispatch({
        type: ActionTypes.GET_DOFILES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const createDoFile = (file) => (dispatch) => {
  axios
    .post(`${ROOT_URL}/dofiles`, file, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      console.log('response', res);
      dispatch({ type: ActionTypes.CREATE_DOFILE });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getSingleDoFile = (fileID) => (dispatch) => {
  axios
    .get(`${ROOT_URL}/dofiles/${fileID}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      console.log('response', res.data);
      dispatch({
        type: ActionTypes.GET_SINGLE_DOFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const saveDoFile = (file) => (dispatch) => {
  axios
    .put(`${ROOT_URL}/dofiles/${file.id}`, file, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      console.log('response', res.data);
      dispatch({
        type: ActionTypes.SAVE_DOFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deleteDoFile = (fileID) => (dispatch) => {
  axios
    .delete(`${ROOT_URL}/dofiles/${fileID}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      console.log('response', res.data);
    })
    .catch((err) => {
      console.error(err);
    });
};
