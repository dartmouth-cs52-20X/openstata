/* eslint-disable comma-dangle */
import axios from 'axios';

export const ROOT_URL = 'https://open-stata.herokuapp.com/api';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  GET_DOFILES: 'GET_DOFILES',
  CREATE_DOFILE: 'CREATE_DOFILE',
  GET_SINGLE_DOFILE: 'GET_SINGLE_DOFILE',
  SAVE_DOFILE: 'SAVE_DOFILE',
  DELETE_DOFILE: 'DELETE_DOFILE',
  GET_LOGFILES: 'GET_LOGFILES',
  GET_SINGLE_LOGFILE: 'GET_SINGLE_LOGFILE',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  GET_DATA: 'GET_DATA',
  GET_TUTORIALS: 'GET_TUTORIALS',
};

export function signinUser(user, history, onError) {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/signin`, user)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
        history.push('/home');
      })
      .catch((error) => {
        console.error(error);
        // dispatch(`Sign In Failed: ${error.response.data}`);
        onError();
      });
  };
}

export function signupUser({ email, password, username }, history, onError) {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/signup`, { email, password, username })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
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

export const getDoFiles = (setInitialized) => (dispatch) => {
  axios
    .get(`${ROOT_URL}/dofiles`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_DOFILES,
        payload: res.data,
      });
      if (setInitialized) setInitialized(true);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getTutorialFiles = (setNext, setInitialized) => (dispatch) => {
  axios
    .get(`${ROOT_URL}/tutorials`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_TUTORIALS,
        payload: res.data,
      });
      if (setNext) setNext(setInitialized);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const createDoFile = (file, history) => (dispatch) => {
  axios
    .post(`${ROOT_URL}/dofiles`, file, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      dispatch({ type: ActionTypes.CREATE_DOFILE });
      history.push(`/editor/${res.data}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getSingleDoFile = (fileID, setInitialized) => (dispatch) => {
  axios
    .get(`${ROOT_URL}/dofiles/${fileID}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_SINGLE_DOFILE,
        payload: res.data,
      });
      if (setInitialized) setInitialized(true);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const saveDoFile = (file, fileid, callback) => (dispatch) => {
  axios
    .put(`${ROOT_URL}/dofiles/${fileid}`, file, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      dispatch({
        type: ActionTypes.SAVE_DOFILE,
        payload: res.data,
      });
      if (callback) callback();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deleteDoFile = (fileID, history) => (dispatch) => {
  axios
    .delete(`${ROOT_URL}/dofiles/${fileID}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      history.push('/home');
    })
    .catch((err) => {
      console.error(err);
    });
};

// for saving URL and alias to server
export function saveURL(post, callback) {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/data`, post, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then((response) => {
        console.log(response.data);
        // eslint-disable-next-line no-alert
        callback(
          `Successfully uploaded ${response.data.fileName}! You can now use this data set by typing the command "use ${response.data.fileName}" into the code editor!`,
          'success'
        );
      })
      .catch((error) => {
        console.log('wut');
        dispatch(`Upload Failed: ${error.response.data}`);
      });
  };
}

export function changePassword(newPassword, onError) {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/changepwd`, newPassword, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .catch((error) => {
        console.error(error);
        onError();
      });
  };
}
export const getLogFiles = () => (dispatch) => {
  axios
    .get(`${ROOT_URL}/logfiles`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_LOGFILES,
        payload: res.data,
      });
    });
};

export const getSingleLogFile = (logID) => (dispatch) => {
  axios
    .get(`${ROOT_URL}/logfiles/${logID}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_SINGLE_LOGFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getData = () => (dispatch) => {
  axios
    .get(`${ROOT_URL}/data`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_DATA,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const runCompilation = (
  code,
  tutorialID,
  compilation,
  setCompilation,
  setRunLoading,
  updateLogs
) => {
  axios
    .post(
      'https://open-stata.herokuapp.com/api/parse',
      { dofile: code, tutorialID },
      {
        headers: { authorization: localStorage.getItem('token') },
      }
    )
    .then((res) => {
      setCompilation(
        `${compilation}\n\n-----------------------------\n\n${res.data.output.join(
          '\n\n'
        )}`
      );
      setRunLoading(false);
      if (updateLogs) updateLogs();
    })
    .catch((err) => {
      setCompilation(
        `${compilation}\n\n-----------------------------\n\nError: ${err.response.data.output}`
      );
      setRunLoading(false);
    });
};
