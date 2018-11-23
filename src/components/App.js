import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleQuestionData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleQuestionData());
  }

  render() {
    return (
      <div>
        <LoadingBar />
        <Dashboard />
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
