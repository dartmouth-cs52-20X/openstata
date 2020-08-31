import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const LogfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_LOGFILES:
      return { all: action.payload, current: state.current };
    case ActionTypes.GET_SINGLE_LOGFILE:
      return { all: state.all, current: action.payload };
    default:
      return state;
  }
};

export default LogfileReducer;
