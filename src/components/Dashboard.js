import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';

class Dashboard extends Component {
  render() {
    const { unansweredQuestions, answeredQuestions, loading } = this.props;

    return (
      <Fragment>
        <p>Dashboard Component</p>

        {!loading && (
          <Fragment>
            <div>
              <h3 className="center">Answered Questions</h3>{' '}
              <QuestionList questions={answeredQuestions} />
            </div>
            <div>
              <h3 className="center">Unanswered Questions</h3>
              <QuestionList questions={unansweredQuestions} />
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { authedUser, questions, users } = state;

  if (Object.keys(questions).length < 1) {
    return {
      loading: true,
    };
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
    loading: false,
  };
}

export default connect(mapStateToProps)(Dashboard);
