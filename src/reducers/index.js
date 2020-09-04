import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import DoFileReducer from './dofile-reducer';
import LogFileReducer from './logfile-reducer';
import DataReducer from './data-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  dofiles: DoFileReducer,
  logfiles: LogFileReducer,
  data: DataReducer,
});

export default rootReducer;
