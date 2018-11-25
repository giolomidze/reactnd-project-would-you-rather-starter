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
              {this.props.authedUser && (
                <Fragment>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <div>
                        <div>
                          <Dashboard />}
                        </div>
                      </div>
                    )}
                  />
                  <Route exact path="/questions/:id" component={QuestionInfo} />
                </Fragment>
              )}
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
