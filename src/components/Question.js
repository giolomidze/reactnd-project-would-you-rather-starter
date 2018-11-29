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
    const { question, id, users } = this.props;
    return (
      <div className="row">
        <div className="col-sm text-center">
          <div>
            <img
              src={users[question.author].avatarURL}
              className="avatar"
              alt={question.name}
            />
          </div>
          <div>
            <div>
              <h5>{question.name} asks:</h5>
            </div>
            <div>
              <h6>Would you Rather?</h6>
              <div>
                {question.optionOne.text} or {question.optionTwo.text}?
              </div>
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

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];

  return {
    users,
    question,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
