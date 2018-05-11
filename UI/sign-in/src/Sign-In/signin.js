import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';
import SignOut from '../Sign-Out/signout';
import '../CSS/forms.css';

Amplify.configure(aws_exports);

class SignIn extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Username: '',
        Password:'',
        errorMSG:''
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event){
      event.preventDefault();
      console.log(Auth.currentSession());
      let username = this.state.Username;
      let password = this.state.Password;
      Auth.signIn(username, password)
      .then(user => {
        console.log(user)
        this.setState({
          errorMSG: ""
        });
        this.props.logined(true);
        console.log(Auth.currentSession());     
      })
      .catch(err => {
        this.setState({
          errorMSG: err.message
        })
      });
  
    }

    renderSignInForm(){
      return (        
        <div className="forms">
          <form id="login" onSubmit={this.handleSubmit}>
            <div className="formHead">
              <h1>SIGN IN</h1>
            </div>
            <div className="formDiv">
              <input type="text" placeholder="Username" value={this.state.Username} onChange={event => this.setState({Username: event.target.value})}/>
            </div>
            <div className="formDiv">
              <input type="password" placeholder="Password" value={this.state.Password} onChange={event => this.setState({Password: event.target.value})}/>
            </div>
            <div className="errMSG">{this.state.errorMSG}</div>
            <div className="formDiv">
              <input type="submit" value="LOGIN"/>
            </div>
            <div className="formOther">
              <a onClick={() => this.props.onClick("Forget")}>Forget password</a>
              <a onClick={() => this.props.onClick("SignUp")}>Creat account</a>
            </div>

          </form>

        </div>
      );
    }
  
    render() {
      return (
        this.props.isAuth
        ? <SignOut logined={(i) => this.props.logined(i)}/> 
        : this.renderSignInForm()
      );
    }
}
export default SignIn;