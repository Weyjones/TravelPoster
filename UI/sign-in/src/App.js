import React, { Component } from 'react';
import './App.css';
import SignIn from './Sign-In/signin'
import SignUp from './Sign-Up/signup'
import Forget from './Forget/forget'
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "SignIn",
      isAuth: false
    };
    Auth.currentSession()
    .then(user => {
      this.logined(true);
    })
    .catch(err => {
      this.logined(false);
    });
  }
  switchFrom() {
    switch(this.state.show) {
      case 'Forget':
        return <Forget onClick={(i) => this.handleClick(i)}/>;
      case 'SignUp':
        return <SignUp onClick={(i) => this.handleClick(i)}/>;
      case 'SignIn':
        return <SignIn isAuth={this.state.isAuth} logined={(i) => this.logined(i)} onClick={(i) => this.handleClick(i)}/>;
      default:
        return <SignIn isAuth={this.state.isAuth} logined={(i) => this.logined(i)} onClick={(i) => this.handleClick(i)}/>;
    }
  }

  logined(i){
    this.setState({
      isAuth: i
    });
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

