import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleQuestionData, handleUsersData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import QuestionInfo from './QuestionInfo';

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
          {this.props.loading === true ? null : (
            <Switch>
              <Route
                path="/home/:id"
                render={() => (
                  <div>
                    <div>{this.props.authedUser && <Dashboard />}</div>
                  </div>
                )}
              />
              <Route path="/questions/:id" exact component={QuestionInfo} />
            </Switch>
          )}
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
