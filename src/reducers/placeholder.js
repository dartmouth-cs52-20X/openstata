const initialState = {
  all: [],
  current: {},
};

const SomeReducer = (state = initialState, action) => {
  console.log('Action', action.type);
  switch (action.type) {
    case 'ha':
      return { all: action.payload, current: state.current };
    case 'buzz':
      return { all: state.all, current: action.payload };
    default:
      return state;
  }
};

export default SomeReducer;
