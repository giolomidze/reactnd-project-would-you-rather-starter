import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { handleCreateQuestion } from '../actions/shared';
import Navigation from './Navigation';

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
    const { authedUser } = this.props;

    if (!authedUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Fragment>
        <Navigation />
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
      </Fragment>
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
