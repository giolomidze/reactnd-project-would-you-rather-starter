export const RECEIVE_USERS = 'RECEIVE_USERS';
export const USER_ANSWER_QUESTIONS = 'ANSWER_QUESTIONS';
export const NEW_USER_QUESTION = 'NEW_QUESTION';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function userAnswerQuestion(id, authedUser, answer, question) {
  return {
    type: USER_ANSWER_QUESTIONS,
    id,
    authedUser,
    answer,
    question,
  };
}

export function userCreateQuestion(question, user) {
  return {
    type: NEW_USER_QUESTION,
    question,
    user,
  };
}
