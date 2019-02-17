import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import MatchesList from './MatchesList';

const query = [
  {
    collection: 'users',
    orderBy: ['lastSignInTime', 'desc']
    // limit: 5
  }
];

const mapState = state => ({
  loading: state.async.loading,
  users: state.firestore.ordered.users,
  auth: state.firebase.auth,
  user: state.firebase.profile
});

class MatchesDashboard extends Component {
  render() {
    const { users, auth, user } = this.props;
    if (users === undefined) return <div>Loading.....</div>;
    return (
      <div>
        <MatchesList users={users} auth={auth} user={user}/>
      </div>
    );
  }
}

export default connect(mapState)(firestoreConnect(query)(MatchesDashboard));
