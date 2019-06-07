import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Segment, Card, Icon, Header, Image } from 'semantic-ui-react';
import moment from 'moment';

class MatchesList extends Component {
  handleAge = date => {
    // let age;
    const dob = moment.unix(date.seconds);
    const age = moment().diff(dob, 'years');
    return age;
  };

  render() {
    const { users, auth, user } = this.props;
    let filteredUsers;
    if (users) {
      filteredUsers = users.filter(_user => {
        return _user.id !== auth.uid && _user.gender !== user.gender;
      });
    }

    return (
      <Segment>
        <Header color='teal' content='Your matches' />
        <Card.Group centered  itemsPerRow={5} doubling>
          {filteredUsers &&
              filteredUsers.map(user => (
                  <Card key={user.id} color='red' fluid >
                    <Image src={user.photoURL || '/assets/user.png'} centered/>
                    <Card.Content textAlign='center'>
                      <Card.Header
                        content={`${user.displayName}, ${this.handleAge(
                          user.dateOfBirth
                        )}`}
                        style={{ fontSize: '15px' }}
                      />
                      <Card.Meta textAlign='center'>
                        <span>{user.city}</span>
                      </Card.Meta>
                    </Card.Content>
                    <Card.Content extra textAlign='center'>
                      <Icon.Group size='large'>
                        <NavLink to={`/user/${user.id}`}>
                          <Icon link name='user' style={{ paddingRight: '10px' }} />
                        </NavLink>
                        {// eslint-disable-next-line
                        <a>
                          <Icon name='heart' style={{ paddingRight: '10px' }} />
                        </a>
                        }
                        <NavLink to={`/user/${user.id}?tab=messages`}>
                          <Icon name='mail' />
                        </NavLink>
                      </Icon.Group>
                    </Card.Content>
                  </Card>
              ))}
        </Card.Group>
      </Segment>
    );
  }
}

export default MatchesList;
