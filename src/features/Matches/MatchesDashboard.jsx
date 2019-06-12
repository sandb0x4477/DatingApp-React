import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

import { sendLike } from '../Likes/userAcions'

import MatchesList from './MatchesList';

const actions = {
  sendLike
};


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

  handleSendLike = userId => {
    this.props.sendLike(userId);
  };

  render() {
    const { users, auth, user } = this.props;
    if (users === undefined) return <div>Loading.....</div>;
    return (
      <div>
        <MatchesList users={users} auth={auth} user={user} handleSendLike={this.handleSendLike}/>
      </div>
    );
  }
}

export default connect(mapState, actions)(firestoreConnect(query)(MatchesDashboard));
