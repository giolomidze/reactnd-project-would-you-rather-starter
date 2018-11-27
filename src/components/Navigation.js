import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutUser } from '../actions/authedUser';

class Navigation extends Component {
  logOut = () => {
    const { dispatch } = this.props;
    dispatch(logOutUser());
  };

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">New Question</Link>
          </li>
          <li>
            <Link onClick={this.logOut} to="/login">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authedUser, users } = state;
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Navigation);
