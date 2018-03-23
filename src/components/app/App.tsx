import * as React from 'react';
import './App.css';
import SharkRandom from '../../container/SharkRandom/SharkRandom';
import SocialContent from '../../container/Social/Social';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="app-container">
          <SocialContent />
          <SharkRandom />
        </div>
      </div>
    );
  }
}

export default App;
