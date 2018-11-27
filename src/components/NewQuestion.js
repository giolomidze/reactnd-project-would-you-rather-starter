import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleCreateQuestion } from '../actions/shared';

class NewQuestion extends Component {
  state = {
    answerTwo: '',
    answerOne: '',
  };

  handleAnswerOneChange = e => {
    this.setState({ answerOne: e.target.value });
  };

  handleAnswerTwoChange = e => {
    this.setState({ answerTwo: e.target.value });
  };

  onClick = e => {
    const { authedUser, dispatch, user } = this.props;
    e.preventDefault();
    dispatch(
      handleCreateQuestion(
        {
          author: authedUser,
          optionOneText: this.state.answerOne,
          optionTwoText: this.state.answerTwo,
        },
        user
      )
    ).then(this.props.history.push(`/`));
  };

  render() {
    return (
      <div>
        <div>
          <input
            type="text"
            id="answerOne"
            className="options-input"
            name="answerOne"
            onChange={this.handleAnswerOneChange}
            value={this.state.answerOne}
          />
        </div>
        <div>
          <input
            type="text"
            id="answerTwo"
            className="options-input"
            name="answerTwo"
            onChange={this.handleAnswerTwoChange}
            value={this.state.answerTwo}
          />
        </div>
        <div>
          <button onClick={this.onClick}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    user: users[authedUser],
  };
}

export default withRouter(connect(mapStateToProps)(NewQuestion));
