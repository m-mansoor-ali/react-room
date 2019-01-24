import React, { Component } from 'react';
import logo from '../../logo.svg';

class AppFlash extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <code>Connecting to react-room...</code>
          </p>
        </header>
      </div>
    );
  }
}

export default AppFlash;

//functional component