import React from 'react';
import moment from 'moment';
import { Comment } from 'semantic-ui-react';


const timeFromNow = timestamp => moment(timestamp).fromNow();

const isOwnMessage = (message, auth) => {
  return message.uid === auth.uid ? 'message__own' : '';
};

const Message = ({ message, auth }) => {
  // console.log('auth:', auth);
  // console.log('message:', message);
  return (
    <Comment>
      <Comment.Avatar src={message.photoURL || '/assets/user.png'} />
      <Comment.Content className={isOwnMessage(message, auth)}>
        <Comment.Author>{message.displayName}</Comment.Author>
        <Comment.Metadata><span>{timeFromNow(message.date)}</span></Comment.Metadata>
        <Comment.Text>{message.text}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default Message;
