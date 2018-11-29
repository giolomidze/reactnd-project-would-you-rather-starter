import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from './Navigation';

class LeaderBoard extends Component {
  render() {
    const { users, authedUser } = this.props;

    if (!authedUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Fragment>
        <Navigation />
        <div className="row">
          <div className="col-sm text-center">
            {console.log(users)}
            <ul>
              {users.map((user, index) => {
                return (
                  <li key={user.id}>
                    <img
                      className="avatar"
                      src={user.avatarURL}
                      alt={user.name}
                    />
                    <p>{user.name}</p>
                    <p>Asked: {user.questions.length}</p>
                    <p>Answered: {Object.keys(user.answers).length}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const usersIds = Object.keys(users).sort(
    (a, b) =>
      Object.keys(users[b].answers).length +
      users[b].questions.length -
      (Object.keys(users[a].answers).length + users[a].questions.length)
  );

  const usersArray = [];

  usersIds.forEach(id => {
    usersArray[usersArray.length] = users[id];
  });

  return {
    users: usersArray,
    authedUser,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
