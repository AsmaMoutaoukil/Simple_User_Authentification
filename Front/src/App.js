import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';


import Home from './Screen/HomePage/Home';
import Login from './Screen/AuthPage/Login';
import Register from './Screen/AuthPage/Register';
function App() {
  return (

    <BrowserRouter>
          <div className="App">
            <Switch>
              {/* Auth page */}
              <Route path="/login" exact component={Login} ></Route>
            <Route path="/register" exact component={Register} ></Route>
              {/* Home page */}
            <Route path="/" exact component={Home}  ></Route>
            <Route component={Error}></Route>
            </Switch>
         

          </div>
        </BrowserRouter>
  );
}

export default App;