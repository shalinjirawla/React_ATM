import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login/login';
import RouteComponent from './Router';

class App extends Component {
  constructor() {
    super();
    // this.checkLogin();
  }
  componentWillMount(){
    this.checkLogin();  
  }
  checkLogin() {
    let userData = localStorage.getItem("userData");
    if (userData == null || userData == undefined) {
      if (window.location.href.indexOf("/login") > -1) {

      }
      else {
        // this.props.history.push('/login');
        window.location.href = '/login';
      }
    }
    else {
      if (window.location.href.indexOf("/login") > -1) {
        // this.props.history.push('/');
        window.location.href = '/';
      }
    }
  }
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <Login />
      // </div>
      <div>
        <RouteComponent />
      </div>
    );
  }
}

export default App;
