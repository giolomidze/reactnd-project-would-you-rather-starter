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
          {questions.map(id => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  const unansweredQues = users[authedUser].questions;
  return {
    questionIds: unansweredQues.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(QuestionList);
