import { RECEIVE_QUESTIONS, ANSWER_QUESTIONS } from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ANSWER_QUESTIONS:
      const { id, answer, authedUser, question } = action;
      return {
        ...state,
        [id]: {
          ...state[id],
          [answer]: {
            ...state[id][answer],
            votes: question[answer].votes.concat([authedUser]),
          },
        },
      };
    default:
      return state;
  }
}
