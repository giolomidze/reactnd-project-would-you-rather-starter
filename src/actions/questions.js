export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTIONS = 'ANSWER_QUESTIONS';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function updateAnswer(id, authedUser, answer, question) {
  return {
    type: ANSWER_QUESTIONS,
    id,
    authedUser,
    answer,
    question,
  };
}
