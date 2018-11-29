import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionList extends Component {
  render() {
    const { questions } = this.props;
    return (
      <div>
        <h3 className="center">Your Timeline</h3>
        <ul>
          {questions.map(question => (
            <li key={question.id}>
              <Question key={question.id} id={question.id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const question = questions[id];

  return {
    users,
    question,
  };
}

export default connect(mapStateToProps)(QuestionList);
