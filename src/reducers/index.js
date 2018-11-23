import { combineReducers } from 'redux';
import authedUser from './authedUser';
import { loadingBarReducer } from 'react-redux-loading';
import questions from './questions';

export default combineReducers({
  authedUser,
  questions,
  loadingBar: loadingBarReducer,
});
