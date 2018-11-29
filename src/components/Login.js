import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { withRouter } from 'react-router-dom';
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
      <div id="login" className="row">
        <div className="col-sm text-center">
          <div className="alert alert-primary" role="alert">
            <h5>Click on one of the users to login</h5>
          </div>
          <ul className="list-inline">
            {Object.keys(users).map(user => {
              return (
                <li
                  className="list-inline-item"
                  key={generateUID()}
                  onClick={e => this.loginUser(e, user)}
                >
                  <div id={user}>
                    <div>
                      <img
                        src={users[user]['avatarURL']}
                        alt={users[user]['name']}
                        className="img-thumbnail"
                      />
                    </div>
                    <div className="center">{users[user]['name']} </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
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

export default withRouter(connect(mapStateToProps)(Login));
