import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);



class SignIn extends Component {
  render() {
    return this.props.show == "SignIn" ? (
      <div>
        <form id="login">
          <div>
            <h1>SIGN IN</h1>
          </div>
          <div>
            <input type="text" placeholder="Username" name="username"/>
          </div>
          <div>
            <input type="password" placeholder="Password" name="password"/>
          </div>
          <div>
            <input type="submit" value="LOGIN"/>
          </div>
          <button onClick={() => this.props.onClick("Forget")}>Forget password</button>
          <button onClick={() => this.props.onClick("SignUp")}>Creat account</button>
        </form>

      </div>
    ) : null;
  }
}

class SignUp extends Component {
  
  render() {
    return this.props.show == "SignUp" ? (
      <div>
        <form id="register">
          <div>
            <h1>REGISTER</h1>
          </div>
          <div>
            <input type="text" placeholder="Username" name="username"/>
          </div>
          <div>
            <input type="email" placeholder="Email" name="email"/>
          </div>
          <div>
            <input type="password" placeholder="Password" name="password"/>
          </div>
          <div>
            <input type="submit" value="REGISTER"/>
          </div>
          <button onClick={() => this.props.onClick("SignIn")}>Back to login</button>
        </form>
      </div>
    ) : null;
  }
}

class Forget extends Component {
  render() {
    return this.props.show == "Forget" ? (
      <div>
        <form id="forgot">
          <div>
            <div>
              <h1>FORGOT PASSWORD?</h1>
            </div>
            <div>
              <input type="email" placeholder="Type your email"/>
            </div>
            <div>
              <input type="submit" value="SEND EMAIL"/>
            </div>
            <button onClick={() => this.props.onClick("SignIn")}>Back to login</button>
          </div>
        </form>
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

