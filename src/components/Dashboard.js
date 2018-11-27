import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';

const unansweredQuestionsTab = 'unansweredQuestionsTab';
const answeredQuestionsTab = 'answeredQuestionsTab';

class Dashboard extends Component {
  state = {
    tab: answeredQuestionsTab,
  };

  changeTab(tab) {
    if (tab !== this.state.tab) {
      this.setState({ tab: tab });
    }
  }

  render() {
    const { unansweredQuestions, answeredQuestions, loading } = this.props;

    return (
      <Fragment>
        <div className="row">
          <div className="col-sm text-center">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a
                  className={`nav-link ${
                    this.state.tab === answeredQuestionsTab ? 'active' : ''
                  }`}
                  href="#"
                  onClick={() => {
                    this.changeTab(answeredQuestionsTab);
                  }}
                >
                  Answered Questions
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className={`nav-link ${
                    this.state.tab === unansweredQuestionsTab ? 'active' : ''
                  }`}
                  href="#"
                  onClick={() => {
                    this.changeTab(unansweredQuestionsTab);
                  }}
                >
                  Unanswered Questions
                </a>
              </li>
            </ul>

            {!loading && (
              <Fragment>
                {this.state.tab === answeredQuestionsTab ? (
                  <QuestionList questions={answeredQuestions} />
                ) : (
                  ''
                )}
                {this.state.tab === unansweredQuestionsTab ? (
                  <QuestionList questions={unansweredQuestions} />
                ) : (
                  ''
                )}
              </Fragment>
            )}
          </div>
        </div>
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
