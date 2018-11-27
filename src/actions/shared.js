import { showLoading, hideLoading } from 'react-redux-loading';
import {
  getQuestions,
  getAllUsers,
  saveQuestionAnswer,
  createAnswer,
} from '../utils/api';
import {
  receiveQuestions,
  answerQuestion,
  createQuestion,
} from '../actions/questions';
import {
  receiveUsers,
  userAnswerQuestion,
  userCreateQuestion,
} from '../actions/users';

export const AUTHED_ID = 'tylermcginnis';

export function handleUsersData() {
  return dispatch => {
    dispatch(showLoading());
    return getAllUsers().then(users => {
      dispatch(receiveUsers(users));
      dispatch(hideLoading());
    });
  };
}

export function answerQuestions(id, authedUser, answer, question) {
  return dispatch => {
    dispatch(showLoading());
    return saveQuestionAnswer(authedUser, id, answer).then(() => {
      dispatch(answerQuestion(id, authedUser, answer, question));
      dispatch(userAnswerQuestion(id, authedUser, answer, question));
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

export function handleCreateQuestion(question, user) {
  return dispatch => {
    dispatch(showLoading());
    return createAnswer(question).then(response => {
      dispatch(createQuestion(response, user));
      dispatch(userCreateQuestion(response, user));
      dispatch(hideLoading());
    });
  };
}
