import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import NavBar from '../../features/nav/NavBar/NavBar';
import ModalManager from '../../features/modals/ModalManager'

class App extends Component {
  render() {
    return (
      <div className='ui container'>
        <ModalManager />
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
