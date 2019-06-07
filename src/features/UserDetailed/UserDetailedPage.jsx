import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { Grid, Segment, Menu } from 'semantic-ui-react';
import queryString from 'query-string';

import { userDetailedQuery } from './userQuery';
import UserSidebar from './UserSidebar';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserAbout from './UserAbout';
import UserDetailedMessage from './UserDetailedMessage';

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  profile =
    !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
  userUid = ownProps.match.params.id;

  return {
    userUid,
    profile,
    requesting: state.firestore.status.requesting,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos
  };
};

const actions = {};

class UserDetailedPage extends Component {
  state = { activeItem: 'about' };

  changeTab = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  async componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    // console.log(values.tab);
    if (values.tab) {
      this.setState({ activeItem: values.tab });
    }

    let user = await this.props.firestore.get(`users/${this.props.match.params.id}`);
    if (!user.exists) {
      console.log('Not found', 'This is not the user you are looking for');
      this.props.history.push('/error');
    }
  }

  getChannelId = userId => {
    const currentUserId = this.props.auth.uid;
    return userId < currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  render() {
    const { activeItem } = this.state;
    const { profile, photos, requesting, match, auth } = this.props;
    const loading = requesting[`users/${match.params.id}`];
    // console.log('loading:', loading);
    // console.log('auth:', auth);
    // console.log('photos:', photos);
    // console.log('profile:', profile);
    if (loading || !profile) return <div>Loading...</div>;
    return (
      <Grid>
        <Grid.Column width={3}>
          <UserSidebar profile={profile} changeTab={this.changeTab} />
        </Grid.Column>
        <Grid.Column width={13}>
          <Segment color='red'>
            <Menu tabular>
              <Menu.Item
                name='about'
                active={activeItem === 'about'}
                onClick={this.changeTab}
              />
              <Menu.Item
                name='photos'
                active={activeItem === 'photos'}
                onClick={this.changeTab}
              />
              <Menu.Item
                name='messages'
                active={activeItem === 'messages'}
                onClick={this.changeTab}
              />
            </Menu>
            {activeItem === 'photos' && <UserDetailedPhotos photos={photos} />}
            {activeItem === 'about' && <UserAbout profile={profile} />}
            {activeItem === 'messages' && <UserDetailedMessage auth={auth} channelId={this.getChannelId(profile.id)}/>}
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);
