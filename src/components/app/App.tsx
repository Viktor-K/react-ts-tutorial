import * as React from 'react';
import './App.css';
import SharkRandom from '../../container/SharkRandom/SharkRandom';

const logo = require('../../img/Discoversharks.png');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header"> <img src={logo} className="discover-shark-logo" alt="logo" /> </header>
        <div className="app-container">
          <SharkRandom />
        </div>
      </div>
    );
  }
}

export default App;
