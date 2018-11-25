import { showLoading, hideLoading } from 'react-redux-loading';
import { getQuestions, getAllUsers, saveQuestionAnswer } from '../utils/api';
import { receiveQuestions, updateAnswer } from '../actions/questions';
import { receiveUsers, updateUser } from '../actions/users';
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

export function answerQuestions(id, authedUser, answer, question) {
  return dispatch => {
    dispatch(showLoading());
    return saveQuestionAnswer(authedUser, id, answer).then(() => {
      dispatch(updateAnswer(id, authedUser, answer, question));
      dispatch(updateUser(id, authedUser, answer, question));
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
