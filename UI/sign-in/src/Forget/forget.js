import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';
import '../CSS/forms.css';

Amplify.configure(aws_exports);

class Forget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      errorMSG:'',
      code:'',
      newPass:'',
      canRest: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    let username = this.state.Username;
    Auth.forgotPassword(username)
    .then(data => {
      this.setState({
        errorMSG: '',
        canRest: true,
      })
    })
    .catch(err => {
      this.setState({
        errorMSG: err.message
      })
    });
  }

  handleReset(event){
    event.preventDefault();
    let username = this.state.Username;
    let code = this.state.code;
    let new_password = this.state.newPass;
    Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data => {
      this.setState({
        errorMSG: 'Success! Please go back and login.',
      })
    })
    .catch(err => {
      this.setState({
        errorMSG: err.message
      })
    });
  }
  resetForm(){
    return (
      <div className="forms">
        <form id="reset" onSubmit={this.handleReset}>      
          <div className="formHead">
            <p>Please use the code we send to your register email to reset you password</p>
          </div>
          <div className="formDiv">
            <input type="text" placeholder="Enter Username again" value={this.state.Username} onChange={event => this.setState({Username: event.target.value})}/>
          </div>
          <div className="formDiv">
            <input type="text" placeholder="Password reset code" value={this.state.code} onChange={event => this.setState({code: event.target.value})}/>
          </div>
          <div className="formDiv">
            <input type="password" placeholder="New Password" value={this.state.newPass} onChange={event => this.setState({newPass: event.target.value})}/>
          </div>
          <div className="errMSG">{this.state.errorMSG}</div>
          <div className="formDiv">
            <input type="submit" value="Submit"/>
          </div>
          <div className="formOther">
            <a onClick={() => this.props.onClick("SignIn")}>Back to login</a>
          </div>
        </form>
      </div>
    );
  }
  forgetForm(){
    return (
      <div className="forms">
        <form id="forgot" onSubmit={this.handleSubmit}>
          <div  className="formHead">
            <h1>FORGOT PASSWORD?</h1>
          </div>
          <div className="formDiv">
            <input type="text" placeholder="Type your username" value={this.state.Username} onChange={event => this.setState({Username: event.target.value})}/>
          </div>
          <div className="formDiv">
            <input type="submit" value="Submit"/>
          </div>
          <div>{this.state.errorMSG}</div>
          <div className="formOther">
            <a onClick={() => this.props.onClick("SignIn")}>Back to login</a>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      this.state.canRest
      ? this.resetForm()
      : this.forgetForm()
    );
  }
}
export default Forget;
