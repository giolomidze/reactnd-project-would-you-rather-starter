import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
} from './_DATA.js';

export function getAllUsers() {
  return _getUsers();
}

export function getQuestions() {
  return _getQuestions();
}
export function saveQuestionAnswer(authedUser, qid, answer) {
  return _saveQuestionAnswer(authedUser, qid, answer);
}
export function createAnswer(question) {
  return _saveQuestion(question);
}
