import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getQuestionAuthor } from '../utils/helpers';
import { answerQuestions } from '../actions/shared';
import Navigation from './Navigation';

class QuestionInfo extends Component {
  state = {
    value: 'optionOne',
  };

  onClick = e => {
    const { dispatch, id, authedUser, questions } = this.props;
    e.preventDefault();
    dispatch(answerQuestions(id, authedUser, this.state.value, questions[id]));
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { questions, id, loading, authedUser, users } = this.props;

    if (loading) {
      return '';
    }

    if (!authedUser) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: this.props.location },
          }}
        />
      );
    }

    if (!questions[id]) {
      return <Redirect to="/error" />;
    }

    const question = questions[id];
    const user = users[authedUser];
    const questionAuthor = getQuestionAuthor(users, question);
    const isAnswered = Object.keys(user.answers).includes(id);

    return (
      <Fragment>
        <Navigation />
        {!loading && (
          <div className="row">
            <div className="col-sm text-center">
              <div>
                <img
                  className="avatar"
                  src={questionAuthor.avatarUrl}
                  alt="avatar"
                />
              </div>
              {isAnswered ? (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      Asked by {questionAuthor.name}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Poll Results:
                    </h6>
                    <p className="card-text">{question.optionOne.text}:</p>
                    <p className="card-text">
                      {question.optionOne.votes.length} Votes
                    </p>
                    <p className="card-text">
                      {parseInt(
                        (question.optionOne.votes.length /
                          (question.optionOne.votes.length +
                            question.optionTwo.votes.length)) *
                          100,
                        10
                      )}
                      % people voted
                    </p>
                    <hr />
                    <p className="card-text">{question.optionTwo.text}:</p>
                    <p className="card-text">
                      {question.optionTwo.votes.length} Votes
                    </p>
                    <p className="card-text">
                      {parseInt(
                        (question.optionTwo.votes.length /
                          (question.optionOne.votes.length +
                            question.optionTwo.votes.length)) *
                          100,
                        10
                      )}
                      % people voted
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p>Would you Rather</p>
                  <form onSubmit={this.onClick}>
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          id="optionOne"
                          type="radio"
                          name="pollingQues"
                          value="optionOne"
                          checked={this.state.value === 'optionOne'}
                          onChange={this.onChange}
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor="optionOne">
                          {question.optionOne.text}
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          id="optionTwo"
                          type="radio"
                          name="pollingQues"
                          value="optionTwo"
                          checked={this.state.value === 'optionTwo'}
                          onChange={this.onChange}
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor="optionTwo">
                          {question.optionTwo.text}
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.onClick}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;

  if (Object.keys(questions).length < 1) {
    return {
      loading: true,
    };
  }

  return {
    id,
    questions,
    authedUser,
    users,
    loading: false,
  };
}

export default connect(mapStateToProps)(QuestionInfo);
