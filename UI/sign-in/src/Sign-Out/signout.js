import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';

Amplify.configure(aws_exports);

class SignOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          errorMSG:''
        };
    }
  
    render(){
        let user = Auth.currentAuthenticatedUser();
        Auth.currentUserInfo()
        .then(data => {
            this.setState({
            username: data.username
            })
        })
        .catch(err => console.log('error: ', err));

        return(
            <div>
                <h1>Welcome, {this.state.username}</h1>
                <button onClick={() => this.Signout()}>Sign Out</button>
            </div>
        );
    }

    Signout(){
        Auth.signOut()
        .then(data => {
            console.log(data)
            this.props.logined(false);
        })
        .catch(err => console.log(err));
        
    }
}

export default SignOut;