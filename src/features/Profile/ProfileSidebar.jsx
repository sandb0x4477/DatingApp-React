import React from 'react';
import moment from 'moment';
import { Segment, List, Image } from 'semantic-ui-react';

const ProfileSidebar = ({ user }) => {
  let age;
  if (user.dateOfBirth) {
    const dob = moment.unix(user.dateOfBirth.seconds);
    age = moment().diff(dob, 'years');
  }
  return (
    <Segment textAlign='center' color='red'>

      <Image src={user.photoURL || '/assets/user.png'}/>
      <br/>

      <List size={'large'}>
        <List.Item>
          User:
          <List.Header>{user.displayName}</List.Header>
        </List.Item>
        <List.Item>
          Gender:
          <List.Header>{user.gender}</List.Header>
        </List.Item>
        <List.Item>
          Location:
          <List.Header>{user.city}</List.Header>
        </List.Item>
        <List.Item>
          Age:
          <List.Header>{age}</List.Header>
        </List.Item>
        <List.Item>
          Last login:
          <List.Header>{moment(user.lastSignInTime).calendar()}</List.Header>
        </List.Item>
        <List.Item>
          Member since:
          <List.Header>{moment.unix(user.createdAt.seconds).format('MM-DD-YYYY')}</List.Header>
        </List.Item>
      </List>

    </Segment>
  );

};

export default ProfileSidebar;
