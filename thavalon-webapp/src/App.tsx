import React from 'react';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import AccountManager from './utils/accountManager';

function App() {
  const accountManager = AccountManager.getInstance();

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Navbar />
          <h1>Home</h1>
        </Route>
        <Route path="/rules">
          <Navbar />
          <h1>Rules</h1>
        </Route>
        <Route path="/login">
          <Navbar />
          <Login />
        </Route>
        <Route path="/logout">
          <Navbar />
          <Logout />
        </Route>
        <Route path="/register">
          <Navbar />
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
