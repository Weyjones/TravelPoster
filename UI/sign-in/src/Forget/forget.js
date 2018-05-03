import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';

Amplify.configure(aws_exports);

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
export default Forget;
