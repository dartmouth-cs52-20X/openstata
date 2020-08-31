import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const DoFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_DOFILES:
      return { all: action.payload, current: state.current };
    case ActionTypes.GET_SINGLE_DOFILE:
      return { all: state.all, current: action.payload };
    default:
      return state;
  }
};

export default DoFileReducer;
