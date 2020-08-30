import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import DoFileReducer from './dofile-reducer';
import LogFileReducer from './logfile-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  dofiles: DoFileReducer,
  logfiles: LogFileReducer,
});

export default rootReducer;
