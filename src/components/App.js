import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleQuestionData, handleUsersData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import QuestionInfo from './QuestionInfo';
import NewQuestion from './NewQuestion';
import Navigation from './Navigation';
import Login from './Login';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleUsersData());
    this.props.dispatch(handleQuestionData());
  }

  render() {
    return (
      <Fragment>
        <LoadingBar />
        <BrowserRouter>
          <div className="container">
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/questions/:id" component={QuestionInfo} />
            <Route exact path="/add" component={NewQuestion} />
          </div>
        </BrowserRouter>
      </Fragment>
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
