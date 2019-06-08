import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { openModal } from '../modals/modalActions';
import { login } from '../auth/authActions';

const actions = {
  openModal,
  login
};

class HomePage extends Component {
  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  handleLogin = user => {
    let username = 'user' + user;
    let creds = {
      email: username + '@test.com',
      password: 'password'
    };
    this.props.login(creds);
  };

  render() {
    // const { history } = this.props;
    return (
      <div>
        <div className='ui inverted vertical masthead center aligned segment'>
          <div className='ui text container'>
            <h1 className='ui inverted stackable header'>
              <div className='content'>Find your match</div>
            </h1>
            <h3>Come on in to view your matches... All you need to do is singn up!</h3>
            <div onClick={this.handleRegister} className='ui huge white inverted button'>
              Register
              <i className='right arrow icon' />
            </div>
            <h2>{''}</h2>
            <div>
              <Button.Group>
                <Button
                  onClick={() => this.handleLogin('1')}
                  content='Login as user1'
                  color='green'
                  style={{ marginLeft: '0.5em' }}
                />
                <Button
                  onClick={() => this.handleLogin('2')}
                  content='Login as user2'
                  color='green'
                  style={{ marginLeft: '0.5em' }}
                />
                <Button
                  onClick={() => this.handleLogin('3')}
                  content='Login as user3'
                  color='green'
                  style={{ marginLeft: '0.5em' }}
                />
                <Button
                  onClick={() => this.handleLogin('5')}
                  content='Login as user5'
                  color='green'
                  style={{ marginLeft: '0.5em' }}
                />
              </Button.Group>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default
    connect(
      null,
      actions
    )(HomePage)
  ;
