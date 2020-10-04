<<<<<<< HEAD
import React from 'react';
import logo from './logo.svg';
import './App.css';
=======
import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
>>>>>>> 93892a862d0c75c1bacc6fe00c685cc5e1fe369a

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(
    () => setLoggedIn(loggedIn),
    [loggedIn]
  )
  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      <Switch>
        <Route path="/" exact>
          <h1>Home</h1>
        </Route>
        <Route path="/rules">
          <h1>Rules</h1> 
        </Route>
        <Route path="/login">
          <Login setLoggedIn={() => setLoggedIn(true)} />
        </Route>
        <Route path="/logout">
          <Logout setLoggedIn={() => setLoggedIn(false)} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
