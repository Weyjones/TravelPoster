import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);


let showSignIn = true;
let showSignUp = false;
let showForget = false;

class SignIn extends Component {
  render() {
    return this.props.show == "SignIn" ? (
      <div>
        <h1> this is a SignIn form</h1>
        <button onClick={() => this.props.onClick("Forget")}>Forget password</button>
        <button onClick={() => this.props.onClick("SignUp")}>Creat account</button>
      </div>
    ) : null;
  }
}

class SignUp extends Component {
  render() {
    return this.props.show == "SignUp" ? (
      <div>
        <h1> this is a SignUp form</h1>
        <button onClick={() => this.props.onClick("SignIn")}>Back to login</button>
      </div>
    ) : null;
  }
}

class Forget extends Component {
  render() {
    return this.props.show == "Forget" ? (
      <div>
        <h1> this is a Forgot password form</h1>
        <button onClick={() => this.props.onClick("SignIn")}>Back to login</button>
      </div>
    ) : null;
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "SignIn"
    };
  }

  handleClick(i) {
    this.setState({
      show: i
    });
  }
  render() {
    return (
      <div>
        <SignIn show={this.state.show} onClick={(i) => this.handleClick(i)}/>
        <SignUp show={this.state.show} onClick={(i) => this.handleClick(i)}/>
        <Forget show={this.state.show} onClick={(i) => this.handleClick(i)}/>
      </div>
    );
  }
}


export default App;

