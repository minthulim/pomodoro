import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import {theme} from './theme';
import Navbar from "./components/Navbar";
import Pomodoro from "./pages/Pomodoro";
import Login from "./pages/Login";
import Stats from "./pages/Stats";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

function App(props) {
  const {initialUser} = props;
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialUser);
  const [currentUser, setCurrentUser] = useState(initialUser ? initialUser : '');

  function loginSuccessful(username) {
    console.log(`log in success. Setting IsAuthenticated true`);
    setIsAuthenticated(true);
    setCurrentUser(username);
  }

  const loggedOut = () => {
    console.log('logged out');
    setIsAuthenticated(false);
    setCurrentUser('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} currentUser={currentUser} loggedOut={loggedOut}/>
        <Route exact path="/" render={
          props => <Pomodoro {...props} isAuthenticated={isAuthenticated}/>
        }/>
        <Route path="/login" render={
          props => <Login {...props} isAuthenticated={isAuthenticated} loginSuccessful={loginSuccessful}/>
        }/>
        <Route path="/stats" render={
          props => <Stats {...props} isAuthenticated={isAuthenticated}/>
        }/>
        <Route path="/register" render={
          props => <Register {...props} isAuthenticated={isAuthenticated} loginSuccessful={loginSuccessful}/>
        }/>
        <Route path="/settings" render={
          props => <Settings {...props} isAuthenticated={isAuthenticated}/>
        }/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
