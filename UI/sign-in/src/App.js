import React, { Component } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);



class SignIn extends Component {
  render() {
    return (
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
    );
  }
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Email:'',
      Password:'',
      errorMSG:'',
      ComfirmCode: '',
      needComfirm: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hendleComfirm = this.hendleComfirm.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let username = this.state.Username;
    let password = this.state.Password;
    let email = this.state.Email;
    Auth.signUp({
      username,
      password,
      attributes: {
          email,          
      },
      validationData: []  
  })
  .then(data => {
    console.log(data);
    this.setState({
      errorMSG: ""
    })
    this.setState({needComfirm: true})
  })
  .catch(err => {
    console.log(err);
    if(err.code === "UsernameExistsException"){
      this.setState({
        errorMSG: "*This username already exists, please try another username."
      })
    }else if(err.code === "InvalidPasswordException" || err.code === "InvalidParameterException"){
      this.setState({
        errorMSG: "*Password Invalid, please try another password."
      })
    }else{
      this.setState({
        errorMSG: err.message
      })
    }
  });
    
  }

  hendleComfirm(event) {
    event.preventDefault();
    let code = this.state.ComfirmCode;
    let username = this.state.Username;
    Auth.confirmSignUp(username, code)
    .then(data => {
      console.log(data);
      this.setState({
        errorMSG: ""
      });
    })
    .catch(err => {
      console.log(err);
      this.setState({
        errorMSG: err.message
      })
    });
  }

  renderSignUpForm() {
    return (
      <div>
        <form id="register" onSubmit={this.handleSubmit}>
          <div>
            <h1>REGISTER</h1>
          </div>
          <div>
            <input type="text" placeholder="Username" value={this.state.Username} onChange={event => this.setState({Username: event.target.value})}/>
          </div>
          <div>
            <input type="email" placeholder="Email" value={this.state.Email} onChange={event => this.setState({Email: event.target.value})}/>
          </div>
          <div>
            <input type="password" placeholder="Password" value={this.state.Password} onChange={event => this.setState({Password: event.target.value})}/>
          </div>
          <div>{this.state.errorMSG}</div>
          <div>
            <input type="submit" value="REGISTER"/>
          </div>
          <button onClick={() => this.props.onClick("SignIn")}>Back to login</button>
        </form>
      </div>
    );
  }

  renderConfirmationForm() {
    return (
      <div>
        <form id="registerComfirm" onSubmit={this.hendleComfirm}>
          <div>
            <h1>Please check your email for the Confirmation Code.</h1>
          </div>
          <div>
            <input type="text" placeholder="Confirmation Code" value={this.state.ComfirmCode} onChange={event => this.setState({ComfirmCode: event.target.value})}/>
          </div>
          <div>{this.state.errorMSG}</div>
          <div>
            <input type="submit" value="SUBMIT"/>
          </div>
          <button onClick={() => this.props.onClick("SignIn")}>Back to login</button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.needComfirm 
          ? this.renderConfirmationForm() 
          : this.renderSignUpForm()}
      </div>
    );
  }
}

class Forget extends Component {
  render() {
    return (
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
    );
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "SignIn"
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

