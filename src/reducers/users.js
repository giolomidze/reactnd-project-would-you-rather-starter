import {
  RECEIVE_USERS,
  USER_ANSWER_QUESTION,
  NEW_USER_QUESTION,
} from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case USER_ANSWER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.id]: action.answer,
          },
        },
      };
    case NEW_USER_QUESTION:
      const { author, id } = action.question;
      const { user } = action;

      return {
        ...state,
        [author]: {
          ...state[author],
          questions: user.questions.concat([id]),
        },
      };
    default:
      return state;
  }
}
