import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';

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
        console.log(Auth.currentSession());     
      })
      .catch(err => {
        this.setState({
          errorMSG: err.message
        })
      });
  
    }
  
    render() {
      return (
        <div>
          <form id="login" onSubmit={this.handleSubmit}>
            <div>
              <h1>SIGN IN</h1>
            </div>
            <div>
              <input type="text" placeholder="Username" value={this.state.Username} onChange={event => this.setState({Username: event.target.value})}/>
            </div>
            <div>
              <input type="password" placeholder="Password" value={this.state.Password} onChange={event => this.setState({Password: event.target.value})}/>
            </div>
            <div>{this.state.errorMSG}</div>
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
export default SignIn;