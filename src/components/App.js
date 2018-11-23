import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleQuestionData, handleUsersData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleUsersData());
    this.props.dispatch(handleQuestionData());
  }

  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true ? null : (
          <div>{this.props.authedUser && <Dashboard />}</div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
