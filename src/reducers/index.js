import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import DoFileReducer from './dofile-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  dofiles: DoFileReducer,
});

export default rootReducer;
