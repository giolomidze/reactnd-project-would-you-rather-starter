import { showLoading, hideLoading } from 'react-redux-loading';
import { getQuestions, getAllUsers } from '../utils/api';
import { receiveQuestions } from '../actions/questions';
import { receiveUsers } from '../actions/users';
import { setAuthedUser } from '../actions/authedUser';

export const AUTHED_ID = 'tylermcginnis';

export function handleUsersData() {
  return dispatch => {
    dispatch(showLoading());
    return getAllUsers().then(users => {
      dispatch(receiveUsers(users));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}

export function handleQuestionData() {
  return dispatch => {
    dispatch(showLoading());
    return getQuestions().then(questions => {
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}
