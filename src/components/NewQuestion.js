import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleCreateQuestion } from '../actions/shared';

class NewQuestion extends Component {
  state = {
    optionTwo: '',
    optionOne: '',
  };

  handleOptionOneChange = e => {
    this.setState({ optionOne: e.target.value });
  };

  handleOptionTwoChange = e => {
    this.setState({ optionTwo: e.target.value });
  };

  onClick = e => {
    const { authedUser, dispatch, user } = this.props;
    e.preventDefault();
    dispatch(
      handleCreateQuestion(
        {
          author: authedUser,
          optionOneText: this.state.optionOne,
          optionTwoText: this.state.optionTwo,
        },
        user
      )
    ).then(this.props.history.push(`/`));
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm text-center">
          <div className="col">
            <div className="form-group">
              <input
                type="text"
                id="optionOne"
                name="optionOne"
                onChange={this.handleOptionOneChange}
                value={this.state.optionOne}
                className="form-control"
                placeholder="Option One"
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <input
                type="text"
                id="optionTwo"
                name="optionTwo"
                onChange={this.handleOptionTwoChange}
                value={this.state.optionTwo}
                className="form-control"
                placeholder="Option Two"
              />
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={this.onClick}>
              Submit
            </button>
          </div>
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
