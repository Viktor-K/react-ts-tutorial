import * as React from 'react';
import './App.css';
import SharkRandom from '../../container/SharkRandom/SharkRandom';
import SocialContent from '../../container/Social/Social';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const logo = require('../../img/Discoversharks.png');

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header"> <img src={logo} className="discover-shark-logo" alt="logo" /> </header>
          <div className="app-container">
            <SharkRandom />
            <SocialContent />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
