import { ActionTypes } from '../actions';

const initialState = {
  all: [],
};

const DataReducer = (state = initialState, action) => {
  console.log('Action', action.type);
  switch (action.type) {
    case ActionTypes.GET_DATA:
      return { all: action.payload };
    default:
      return state;
  }
};

export default DataReducer;
