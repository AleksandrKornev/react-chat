import { combineReducers } from 'redux';
import test from './test';
import auth from './auth';
import message from './message';

const rootReducer = combineReducers({
  test,
  auth,
  message
})

export default rootReducer;