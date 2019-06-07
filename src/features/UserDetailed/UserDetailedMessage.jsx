import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isEmpty, } from 'react-redux-firebase';
import { Button, Input } from 'semantic-ui-react';

import { objectToArray } from '../../app/common/util/helpers'
import { sendMessage } from './userActions';

const mapState = (state, ownProps) => {
  console.log('ownProps:', ownProps);
  console.log('state:', state);
  const splitChannelId = ownProps.channelId.split('/');

  return {
    loading: state.async.loading,
    requesting: state.firebase.requesting,
    auth: state.firebase.auth,
    messages:
      !isEmpty(state.firebase.data.messages) &&
      state.firebase.data.messages[`${splitChannelId[0]}`] &&
      objectToArray(state.firebase.data.messages[`${splitChannelId[0]}`][`${splitChannelId[1]}`])
    // messages: state.firebase.data.messages[`${splitChannelId[0]}`][`${splitChannelId[1]}`]
  };
};

const actions = {
  sendMessage
};

export class UserDetailedMessage extends Component {
  state = {
    message: ''
  };

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  sendMessage = event => {
    this.props.sendMessage(this.props.channelId, this.state.message);
  };

  // filterMessages = (messages, channelId) => {
  //   console.log('messages:', messages);
  //   const splitChannelId = channelId.split('/');
  // };

  render() {
    console.log(this.props);
    const { channelId, messages, requesting } = this.props;
    const { message } = this.state;
    const loadingMessages = requesting[`messages/${channelId}`];

    if (loadingMessages) return <div>Loading...</div>;

    return (
      <div>
        ChannelId: {channelId}
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
        {messages && <p>{JSON.stringify(messages, null, 2)}</p>}
      </div>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firebaseConnect(
    props => props.auth.isLoaded && !props.auth.isEmpty && [`messages/${props.channelId}`]
  )
)(UserDetailedMessage);
