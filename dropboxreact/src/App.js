import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Login from "./components/Login";
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
      <Login/>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
