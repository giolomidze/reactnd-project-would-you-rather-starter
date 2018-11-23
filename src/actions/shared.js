import { showLoading, hideLoading } from 'react-redux-loading';
import { getQuestions } from '../utils/api';
import { receiveQuestions } from '../actions/questions';

export function handleQuestionData() {
  return dispatch => {
    dispatch(showLoading());
    return getQuestions().then(questions => {
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}
