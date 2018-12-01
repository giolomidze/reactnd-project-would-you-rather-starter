import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';

const QuestionList = props => {
  return (
    <div>
      <h3 className="center">Your Timeline</h3>
      <ul>
        {props.questions.map(question => (
          <li key={question.id}>
            <Question key={question.id} id={question.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const question = questions[id];

  return {
    users,
    question,
  };
}

export default connect(mapStateToProps)(QuestionList);
