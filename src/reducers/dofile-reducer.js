import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  tutorials: [],
  current: {},
};

const DoFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_DOFILES:
      return { all: action.payload, tutorials: state.tutorials, current: state.current };
    case ActionTypes.GET_SINGLE_DOFILE:
      return { all: state.all, tutorials: state.tutorials, current: action.payload };
    case ActionTypes.GET_TUTORIALS:
      return { all: state.all, tutorials: action.payload, current: state.current };
    default:
      return state;
  }
};

export default DoFileReducer;
