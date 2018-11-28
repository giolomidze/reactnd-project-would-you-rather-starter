import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { generateUID } from '../utils/helpers';

class Login extends Component {
  loginUser(e, user) {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(user));
    this.props.history.push('/');
  }
  render() {
    const { users } = this.props;

    return (
      <div>
        <h3 className="center">Click to Login</h3>
        <ul>
          {Object.keys(users).map(user => {
            return (
              <li
                key={generateUID()}
                className="center"
                onClick={e => this.loginUser(e, user)}
              >
                <div id={user}>
                  <div>
                    <img
                      src={users[user]['avatarURL']}
                      alt={users[user]['name']}
                    />
                  </div>
                  <div className="center">{users[user]['name']} </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state;

  return {
    users,
  };
}

export default connect(mapStateToProps)(Login);
