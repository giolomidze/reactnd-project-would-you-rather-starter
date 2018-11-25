export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ANSWER_QUESTIONS = 'ANSWER_QUESTIONS';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function updateUser(id, authedUser, answer, question) {
  return {
    type: ANSWER_QUESTIONS,
    id,
    authedUser,
    answer,
    question,
  };
}
