import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    const { unansweredQuestions, answeredQuestions } = this.props;
    console.log('answered questions', answeredQuestions);
    console.log('unanswered questions', unansweredQuestions);
    return (
      <Fragment>
        <Fragment>
          <p>Dashboard Component</p>
        </Fragment>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { authedUser, questions, users } = state;

  if (Object.keys(questions).length < 1) {
    return {};
  }

  const answeredQuestions = Object.keys(users[authedUser].answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const unansweredQuestions = Object.keys(questions)
    .filter(question => !answeredQuestions.includes(question))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  return {
    questions,
    users,
    answeredQuestions,
    unansweredQuestions,
    authedUser,
  };
}

export default connect(mapStateToProps)(Dashboard);
