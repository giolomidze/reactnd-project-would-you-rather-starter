import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutUser } from '../actions/authedUser';

class Navigation extends Component {
  logOut = () => {
    const { dispatch } = this.props;
    dispatch(logOutUser());
  };

  render() {
    const { authedUser, users } = this.props;
    return (
      <div className="row">
        <div className="col-sm text-center">
          {authedUser && (
            <h4 className="center"> Hello, {users[authedUser]['name']}! </h4>
          )}
          <ul className="list-inline">
            <li className="list-inline-item">
              <NavLink exact to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="list-inline-item">
              <NavLink exact to="/add" className="nav-link">
                New Question
              </NavLink>
            </li>
            <li className="list-inline-item">
              <Link onClick={this.logOut} to="#">
                Logout
              </Link>
            </li>
          </ul>
        </div>
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
