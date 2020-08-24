import { ActionTypes } from '../actions';

const initialState = {
  all: [],
};

const DoFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_DOFILES:
      return { all: action.payload };
    default:
      return state;
  }
};

export default DoFileReducer;
