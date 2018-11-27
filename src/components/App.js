import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleQuestionData, handleUsersData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
          {this.props.loading === true ? null : (
            <Fragment>
              <Switch>
                <Route exact path="/login" component={Login} />
                {this.props.authedUser && (
                  <Fragment>
                    <Navigation />
                    <Route
                      exact
                      path="/"
                      render={() => (
                        <div className="container">
                          <Dashboard />
                        </div>
                      )}
                    />
                    <Route
                      exact
                      path="/questions/:id"
                      component={QuestionInfo}
                    />
                    <Route path="/add" exact component={NewQuestion} />
                  </Fragment>
                )}
                <Redirect from="*" to="/login" />
              </Switch>
            </Fragment>
          )}
        </BrowserRouter>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    loading: users === null,
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
