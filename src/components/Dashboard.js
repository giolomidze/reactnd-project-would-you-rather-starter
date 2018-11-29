import React, { Component, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import Navigation from './Navigation';

const unansweredQuestionsTab = 'unansweredQuestionsTab';
const answeredQuestionsTab = 'answeredQuestionsTab';

class Dashboard extends Component {
  state = {
    tab: unansweredQuestionsTab,
  };

  changeTab(tab) {
    if (tab !== this.state.tab) {
      this.setState({ tab: tab });
    }
  }

  render() {
    const { questionsUnanswered, questionsAnswered, authedUser } = this.props;

    if (!authedUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Fragment>
        <Navigation />
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

            <Fragment>
              {this.state.tab === answeredQuestionsTab ? (
                <QuestionList questions={questionsAnswered} />
              ) : (
                ''
              )}
              {this.state.tab === unansweredQuestionsTab ? (
                <QuestionList questions={questionsUnanswered} />
              ) : (
                ''
              )}
            </Fragment>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ questions, authedUser }) {
  const questionIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  const questionsArray = [];

  questionIds.forEach(id => {
    questionsArray[questionsArray.length] = questions[id];
  });

  let questionsAnswered = [];
  let questionsUnanswered = [];

  if (authedUser) {
    questionsUnanswered = questionsArray.filter(question => {
      return (
        !question.optionOne.votes.includes(authedUser) &&
        !question.optionTwo.votes.includes(authedUser)
      );
    });

    questionsAnswered = questionsArray.filter(question => {
      return (
        question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser)
      );
    });
  }

  return {
    questionsUnanswered,
    questionsAnswered,
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(Dashboard));
