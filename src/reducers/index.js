import { combineReducers } from 'redux';
import SomeReducer from './placeholder';

const rootReducer = combineReducers({
  placeholder: SomeReducer,
});

export default rootReducer;
