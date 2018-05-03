import React, { Component } from 'react';
import './App.css';
import SignIn from './Sign-In/signin'
import SignUp from './Sign-Up/signup'
import Forget from './Forget/forget'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "SignIn",
      isAuth: false
    };
  }
  switchFrom() {
    switch(this.state.show) {
      case 'Forget':
        return <Forget onClick={(i) => this.handleClick(i)}/>;
      case 'SignUp':
        return <SignUp onClick={(i) => this.handleClick(i)}/>;
      case 'SignIn':
        return <SignIn onClick={(i) => this.handleClick(i)}/>;
      default:
        return <SignIn onClick={(i) => this.handleClick(i)}/>;
    }
  }
  handleClick(i) {
    this.setState({
      show: i
    });
  }
  render() {
    return (
      <div>
        {this.switchFrom()}
      </div>
    );
  }
}


export default App;

