export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTIONS';
export const NEW_QUESTION = 'NEW_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function answerQuestion(id, authedUser, answer, question) {
  return {
    type: ANSWER_QUESTION,
    id,
    authedUser,
    answer,
    question,
  };
}

export function createQuestion(question, user) {
  return {
    type: NEW_QUESTION,
    question,
    user,
  };
}
