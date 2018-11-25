import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import { withRouter } from 'react-router-dom';

class Question extends Component {
  onClick(e, id) {
    e.preventDefault();
    this.props.history.push(`/questions/${id}`);
  }
  render() {
    const { question, id } = this.props;
    return (
      <div className="tweet">
        <div className="col-md-3">
          <img
            src={question.avatar}
            className="avatar"
            alt={`Avatar of ${question.name}`}
          />
        </div>
        <div className="col-md-9" style={{ width: '100%' }}>
          <div className="question">
            <span>{question.name} asks:</span>
          </div>
          <div>
            <div className="heading-3">Would you Rather?</div>
            <div className="col-md-9 col-md-offset-3">
              OptionOne: {question.text1}
            </div>
            <div className="col-md-9 col-md-offset-3">
              OptionTwo: {question.text2}
            </div>
            <div className="btnHead">
              <button onClick={event => this.onClick(event, id)}>
                View Poll
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    authedUser,
    question: formatQuestion(question, users[question.author], authedUser),
  };
}

export default withRouter(connect(mapStateToProps)(Question));
