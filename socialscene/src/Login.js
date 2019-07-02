import React, { Component } from 'react';
import './App.css';
import Register from './Register';

class Login extends Component { 
    constructor(props){
      super(props);

      var screen=[];
      screen.push(
        <header className="App-header" key="login_screen">
          <h1>SocialScene</h1>
          <h2>Login</h2>

          <form onSubmit={this.submit}>
            <table>
              <tbody>

                <tr>
                  <td>Enter your email: &nbsp;</td>
                  <td><input type="email" id="username" required onChange={(event) => this.change(event)} /></td>
                </tr>

                <tr>
                  <td>Enter your password: &nbsp;</td>
                  <td><input type="password" id="password" required onChange={(event) => this.change(event)} /></td>
                </tr>

              </tbody>
            </table>

            <br/>
            <button type="submit" id="login_button" >Login</button>
          </form>

          &nbsp;
          <div>
            <button onClick={(event) => this.register_evnt(event)}> Register </button>
          </div>
        </header>
      )

      this.state={
        username:'',
        password:'',
        screen:screen
      }
    }

    register_evnt(event){
        this.setState({ screen:<Register /> })
    }

    submit = event => {
      console.log("usrnam = " + this.state.username)
      console.log("passwd = " + this.state.password)
    }

    change(event) {
      console.log("Changed " + event.target.id + " to " + event.target.value)
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    render() {
      return (
        <div className="App">
          <header className="App-header">
            {this.state.screen}
          </header>
        </div>
      );
    }
  }


export default Login;