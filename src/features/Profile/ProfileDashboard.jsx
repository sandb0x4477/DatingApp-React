import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Menu } from 'semantic-ui-react';
// import moment from 'moment';
//
import BioForm from './BioForm';
import ProfileSidebar from './ProfileSidebar';
import PhotosForm from './PhotosForm';
import { updateProfile } from './userActions';


const actions = {
  updateProfile
};

const mapState = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    user: state.firebase.profile
  };
};


class ProfileDashboard extends Component {
  state = { activeItem: 'photos'};

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  onSubmit = formValues => {
    console.log("formValues", formValues);
    this.props.updateProfile(formValues);
  };

  render() {
    const { activeItem } = this.state;
    const { user } = this.props;
    if (!user.isLoaded) return <div>Loading...</div>;
    // console.log("ProfileDashboard Props", this.props);
    // const { photos } = this.prop;

    return (
      <div>
        <Header dividing content="My Profile"/>
        <Grid>
          <Grid.Column width={3}>
              <ProfileSidebar user={user}/>
          </Grid.Column>

          <Grid.Column width={13}>
            <Segment color='red'>
              <Menu tabular>
                <Menu.Item name='bio' active={activeItem === 'bio'}
                           onClick={this.handleItemClick}/>
                <Menu.Item name='photos' active={activeItem === 'photos'}
                           onClick={this.handleItemClick}/>
              </Menu>
              {activeItem === 'bio' &&
              <BioForm initialValues={user} onSubmit={this.onSubmit}/>
              }
              {activeItem === 'photos' &&
              <PhotosForm />
              }
            </Segment>

          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(mapState, actions)(ProfileDashboard);
