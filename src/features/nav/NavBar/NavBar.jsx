import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Container, Icon } from 'semantic-ui-react';

import SignOutLinks from '../Menus/SignedOutLinks';
import SignInLinks from '../Menus/SignedInLinks';
import { openModal } from '../../modals/modalActions';

const actions = {
  openModal
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

class NavBar extends Component {

  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  };

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item as={Link} to='/' header>
            <Icon name='venus mars' size='large' color='pink'/>
            Dating
          </Menu.Item>

          <Menu.Item  as={Link} to='/matches'>Matches</Menu.Item>
          <Menu.Item>Messages</Menu.Item>

          {/*<Menu.Item position='right'>*/}
            {/*<Button content='Sign In' floated='right' color='green'/>*/}
            {/*<Button content='Sign Up' floated='right' color='orange'/>*/}
          {/*</Menu.Item>*/}
          {authenticated ? (
            <SignInLinks auth={auth} profile={profile} signOut={this.handleSignOut} />
          ) : (
            <SignOutLinks
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(
  withFirebase(
    connect(
      mapState,
      actions
    )(NavBar)
  )
);
