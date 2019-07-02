import React, { Component } from 'react';
import './App.css';


class Login extends Component { 

  constructor(props) {
    super(props);
    var loginButtons=[];
    loginButtons.push(
    <div>
     <button onclick={(event) => this.handleClick(event,'student')}> TEST </button>
    </div>
    )


  this.state = {
    username: '',
    password: ''
  };
}

  change = event => {
    console.log("Change in " + event.target.id)
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  verify() {
    return ( this.state.username.length >= 5 && this.state.password.length >= 3 );
  }

  submit = event => {
    console.log("email = " + this.state.username)
    console.log("passw = " + this.state.password)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>SocialScene</h1>

          <form onSubmit={this.submit}>
            <table>
              <tbody>
                <tr>
                  <td>Please enter your email: &nbsp;</td>
                  <td><input type="email" id="username" required onChange={this.change} /></td>
                </tr>
                <tr>
                  <td>Please enter your password: &nbsp;</td>
                  <td><input type="password" id="password" required onChange={this.change} /></td>
                </tr>
              </tbody>
            </table>
            <br/>
            <button type="submit" id="sign_in_button" disabled={!(this.verify())} >Sign In</button>
          </form>

          &nbsp;
          <button>YAYA</button>

        </header>
      </div>
    );
  };
};

export default Login;