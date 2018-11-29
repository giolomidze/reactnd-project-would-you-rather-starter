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
      <div className="row">
        <div className="col-sm text-center">
          <div>
            <img src={question.avatar} className="avatar" alt={question.name} />
          </div>
          <div>
            <div>
              <h5>{question.name} asks:</h5>
            </div>
            <div>
              <h6>Would you Rather?</h6>
              <div>Option One: {question.text1}</div>
              <div>Option Two: {question.text2}</div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={event => this.onClick(event, id)}
                >
                  View Poll
                </button>
              </div>
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
