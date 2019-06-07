import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

const UserAbout = ({ profile }) => {
  // console.log(profile);

  return (
    <div>
      <Segment attached>
        <Header  dividing content='About me:' />
        <p>{profile.about}</p>
        <Header dividing content='Looking for:' />
        <p>{profile.lookingFor}</p>
        <Header dividing content='I am interested in:' />
        <p>{profile.interests}</p>
      </Segment>
    </div>
  );
};

export default UserAbout;
