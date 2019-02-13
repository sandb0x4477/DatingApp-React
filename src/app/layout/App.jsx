import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import NavBar from '../../features/nav/NavBar/NavBar';
import ModalManager from '../../features/modals/ModalManager';
import ProfileDashboard from '../../features/Profile/ProfileDashboard';

class App extends Component {
  render() {
    return (
      <div className='ui container'>
        <ModalManager/>
        {/*<BrowserRouter>*/}
        <NavBar/>
        <Container className="main">
          <Switch>
            <Route path='/profile' component={ProfileDashboard}/>
          </Switch>
        </Container>
        {/*</BrowserRouter>*/}
      </div>
    );
  }
}

export default App;
