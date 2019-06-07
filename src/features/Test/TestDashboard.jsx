import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { Button, Input } from 'semantic-ui-react';

import { sendMessage } from './testActions';

const mapState = (state, ownProps) => {
  return {
    loading: state.async.loading,
    auth: state.firebase.auth,
    messages: !isEmpty(state.firebase.data.messages) && state.firebase.data.messages
  };
};

const actions = {
  sendMessage
};


class TestDashboard extends Component {
  state = {
    message: ''
  };

  getChannelId = userId => {
    const currentUserId = this.props.auth.uid;
    return userId < currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  sendMessage = (event) => {
    // event.preventDefault();
    console.log(this.props);
    this.props.sendMessage('CkG4QMqhXThKvruicqfOp7TT5Ai2', this.state.message);
  }

  render() {
    const { message } = this.state;
    const { messages, auth } = this.props;
    console.log(this.props);

    return (
      <div>
        <Input
          onChange={this.handleChange}
          fluid
          name='message'
          value={message}
          style={{ marginBottom: '0.7em' }}
          placeholder='Write your message'
        />
        <Button
          onClick={this.sendMessage}
          color='orange'
          content='Send'
          labelPosition='left'
          icon='edit'
        />
        <h1>I am test component</h1>
        <h4>ChannelId: {auth.uid}</h4>
        <p>{JSON.stringify(messages, null, 2)}</p>
      </div>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firebaseConnect(props => props.auth.isLoaded && !props.auth.isEmpty && [`messages/WBNyfaLoiWPvPh7ZthrnyvIoIt83/CkG4QMqhXThKvruicqfOp7TT5Ai2`])
)(TestDashboard);
