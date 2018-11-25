import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getQuestionInfo } from '../utils/helpers';
import { answerQuestions } from '../actions/shared';

class QuestionInfo extends Component {
  state = {
    value: 'optionOne',
  };
  onClick = e => {
    const { dispatch, id, authedUser, question } = this.props;
    e.preventDefault();
    dispatch(answerQuestions(id, authedUser, this.state.value, question));
  };
  onChange = e => {
    this.setState({ value: e.target.value });
  };
  render() {
    const { isAnswered, question, users, questionInfo, loading } = this.props;
    return (
      <Fragment>
        {!loading && (
          <div className="tweet">
            <div className="col-md-3">
              <img
                className="avatar"
                src={questionInfo.avatarUrl}
                alt="avatar"
              />
            </div>
            <div className="col-md-9">
              <div className="question"> Asked by {questionInfo.name}</div>
              {isAnswered ? (
                <div className="col-md-12">
                  <div className="heading-3"> Poll Results: </div>
                  <div className="col-md-9 col-md-offset-2 content">
                    <div className="heading-3"> {question.optionOne.text}:</div>
                    <div style={{ textAlign: 'center' }}>
                      {question.optionOne.votes.length} Votes
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      {Math.trunc(
                        (question.optionOne.votes.length /
                          Object.keys(users).length) *
                          100
                      )}
                      % people voted
                    </div>
                  </div>
                  <div className="col-md-9 col-md-offset-2 content">
                    <div className="heading-3"> {question.optionTwo.text}:</div>
                    <div style={{ textAlign: 'center' }}>
                      {' '}
                      {question.optionTwo.votes.length} Votes
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      {Math.trunc(
                        (question.optionTwo.votes.length /
                          Object.keys(users).length) *
                          100
                      )}
                      % people voted
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <form onSubmit={this.onClick}>
                    <div className="col-md-9 col-md-offset-3 content">
                      <input
                        type="radio"
                        name="pollingQues"
                        value="optionOne"
                        checked={this.state.value === 'optionOne'}
                        onChange={this.onChange}
                      />
                      {question.optionOne.text}
                    </div>
                    <div className="col-md-9 col-md-offset-3 content">
                      <input
                        type="radio"
                        name="pollingQues"
                        value="optionTwo"
                        checked={this.state.value === 'optionTwo'}
                        onChange={this.onChange}
                      />
                      {question.optionTwo.text}
                    </div>
                    <div className="btnHead">
                      <button onClick={this.onClick} className="btn">
                        {' '}
                        Submit
                      </button>
                    </div>
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
  console.log('id: ', id);
  const user = users[authedUser];
  console.log('user: ', user);
  if (Object.keys(questions).length < 1) {
    return {
      loading: true,
    };
  }

  const question = questions[id];

  console.log('question: ', question);

  const questionInfo = getQuestionInfo(users, question);
  const isAnswered = Object.keys(user.answers).includes(id);
  return {
    id,
    isAnswered,
    question,
    users,
    questionInfo,
    authedUser,
    loading: false,
  };
}

export default connect(mapStateToProps)(QuestionInfo);
