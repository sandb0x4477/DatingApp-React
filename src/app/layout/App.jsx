import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import NavBar from '../../features/nav/NavBar/NavBar';
import ModalManager from '../../features/modals/ModalManager';
import ProfileDashboard from '../../features/Profile/ProfileDashboard';
import MatchesDashboard from '../../features/Matches/MatchesDashboard';
import UserDetailedPage from '../../features/UserDetailed/UserDetailedPage';
import NotFound from './NotFound';
import TestDashboard from '../../features/Test/TestDashboard';

class App extends Component {
  render() {
    return (
      <div className='ui container'>
        <ModalManager />
        {/*<BrowserRouter>*/}
        <NavBar />
        <Container className='main'>
          <Switch>
            <Route path='/profile' component={ProfileDashboard} />
            <Route path='/matches' component={MatchesDashboard} />
            <Route path='/user/:id' component={UserDetailedPage} />
            <Route path='/error' component={NotFound} />
            <Route path='/test' component={TestDashboard} />
          </Switch>
        </Container>
        {/*</BrowserRouter>*/}
      </div>
    );
  }
}

export default App;
