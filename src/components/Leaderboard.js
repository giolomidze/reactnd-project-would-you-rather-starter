import React, { Component } from 'react';
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
      <div>
        <Navigation /> {users.map((user, index) => user.name)}
      </div>
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
