import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    const { questions } = this.props;
    console.log('received questions: ', questions);
    return (
      <Fragment>
        <p>Dashboard Component</p>
      </Fragment>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    questions,
  };
}

export default connect(mapStateToProps)(Dashboard);
