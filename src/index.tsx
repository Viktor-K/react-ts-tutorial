import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SharkList from './components/SharkList/SharkList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuBar from './components/MenuBar/MenuBar';

ReactDOM.render(
  <Provider store={configureStore()}>
    <MuiThemeProvider>
      <Router>
        <div>
          <MenuBar />
          <Switch>
            <Route exact={true} path="/" component={App} />
            <Route strict={true} path="/shark-list" component={SharkList} />
            <Route render={() => <h1>Page Not Found! </h1>} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
