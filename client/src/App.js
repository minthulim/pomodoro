import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import axios from 'axios';

import config from './config';
import {theme} from './theme';
import Navbar from "./components/Navbar";
import Pomodoro from "./pages/Pomodoro";
import Login from "./pages/Login";
import Stats from "./pages/Stats";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import EditTask from "./pages/EditTask";
import NewTask from "./pages/NewTask";

function App(props) {
  const {initialUser} = props;
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialUser);
  const [currentUser, setCurrentUser] = useState(initialUser ? initialUser : '');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get(`${config.API_ROOT}/api/pomodoro/tasks`, {withCredentials: true})
        .then(response => setTasks(response.data));
    } else {
      setTasks([]);
    }
  }, [isAuthenticated]);

  function loginSuccessful(username) {
    console.log(`log in success. Setting IsAuthenticated true`);
    setIsAuthenticated(true);
    setCurrentUser(username);
  }

  function loggedOut() {
    console.log('logged out');
    setIsAuthenticated(false);
    setCurrentUser('');
  }

  function refreshTasks() {
    setTasks([]);
    axios.get(`${config.API_ROOT}/api/pomodoro/tasks`, {withCredentials: true})
      .then(response => setTasks(response.data));
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} currentUser={currentUser} loggedOut={loggedOut}/>
        <Switch>
          <Route exact path="/" render={
            props => <Pomodoro {...props} isAuthenticated={isAuthenticated} tasks={tasks}/>
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
          <Route path="/settings" exact render={
            props => <Settings {...props} isAuthenticated={isAuthenticated} tasks={tasks}/>
          }/>
          <Route path="/settings/task/new" render={
            props => <NewTask {...props} isAuthenticated={isAuthenticated} refreshTasks={refreshTasks}/>
          }/>
          <Route path="/settings/task/:taskId" render={
            props => <EditTask {...props} isAuthenticated={isAuthenticated} tasks={tasks} refreshTasks={refreshTasks}/>
          }/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
