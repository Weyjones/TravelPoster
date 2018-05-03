import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';

Amplify.configure(aws_exports);

class SignOut extends Component {
    render(){
        return(
            <button onClick={() => this.Signout()}>Sign Out</button>
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