import React from 'react';
import moment from 'moment';
import { Segment, List, Image } from 'semantic-ui-react';

const UserSidebar = ({ profile }) => {
  let age;
  if (profile.dateOfBirth) {
    const dob = moment.unix(profile.dateOfBirth.seconds);
    age = moment().diff(dob, 'years');
  }
  return (
    <Segment textAlign='center' color='red'>

      <Image src={profile.photoURL || '/assets/user.png'}/>
      <br/>

      <List size={'large'}>
        <List.Item>
          User:
          <List.Header>{profile.displayName}</List.Header>
        </List.Item>
        <List.Item>
          Gender:
          <List.Header>{profile.gender}</List.Header>
        </List.Item>
        <List.Item>
          Location:
          <List.Header>{profile.city}</List.Header>
        </List.Item>
        <List.Item>
          Age:
          <List.Header>{age}</List.Header>
        </List.Item>
        <List.Item>
          Last login:
          <List.Header>{moment(profile.lastSignInTime).calendar()}</List.Header>
        </List.Item>
        <List.Item>
          Member since:
          <List.Header>{moment.unix(profile.createdAt.seconds).format('MM-DD-YYYY')}</List.Header>
        </List.Item>
      </List>

    </Segment>
  );

};

export default UserSidebar;
