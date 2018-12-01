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

  handleSubmit = e => {
    e.preventDefault();
    const { authedUser, dispatch, user } = this.props;

    if (this.state.optionOne.length < 1 || this.state.optionTwo < 1) {
      return false;
    }

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
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: this.props.location },
          }}
        />
      );
    }

    return (
      <Fragment>
        <Navigation />
        <div className="row">
          <div className="col-sm text-center">
            <form onSubmit={this.handleSubmit}>
              <div className="col">
                <div className="form-group">
                  <input
                    required
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
                    required
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
                <button className="btn btn-primary" type="submit">
                  Create
                </button>
              </div>
            </form>
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
