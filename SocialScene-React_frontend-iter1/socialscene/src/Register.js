import React, { Component } from 'react';
import './App.css';
import Login from './Login';

class Register extends Component { 
    constructor(props){
      super(props);

      var screen=[];
      screen.push(
        <header className="App-header" key="register_screen">
          <h1>SocialScene</h1>
          <h2>Register</h2>

          <form onSubmit={this.submit}>
            <table>
              <tbody>
                <tr>
                  <td>Please enter your first name: &nbsp;</td>
                  <td><input type="text" id="fname" required onChange={(event) => this.change(event)} /></td>
                </tr>
                <tr>
                  <td>Please enter your last name: &nbsp;</td>
                  <td><input type="text" id="lname" required onChange={(event) => this.change(event)} /></td>
                </tr>
                <tr>
                  <td>Please enter your email: &nbsp;</td>
                  <td><input type="email" id="username" required onChange={(event) => this.change(event)} /></td>
                </tr>
                <tr>
                  <td>Please enter your password: &nbsp;</td>
                  <td><input type="password" id="password" required onChange={(event) => this.change(event)} /></td>
                </tr>
                <tr>
                  <td>Please confirm your password: &nbsp;</td>
                  <td><input type="password" id="pass_confirm" required onChange={(event) => this.change(event)} /></td>
                </tr>
              </tbody>
            </table>
            <br/>
            <button id="register_button" onClick={(event) => this.verify(event)} >Register</button>
          </form>

          &nbsp;
          <div>
            <button onClick={(event) => this.login_evnt(event)}> Login </button>
          </div>

        </header>
      )

      this.state={
        fname:'',
        lname:'',
        username:'',
        password:'',
        pass_confirm:'',
        screen:screen,
      }
    }

    login_evnt(event) {
        this.setState({ screen:<Login /> })
    }

    submit = event => {
      console.log("fname = " + this.state.fname)
      console.log("lname = " + this.state.lname)
      console.log("username = " + this.state.username)
      console.log("password = " + this.state.password)
      console.log("pass_confirm = " + this.state.pass_confirm)
    }

    verify(event){
      if ( this.state.fname.length>0 &&
           this.state.lname.length>0 &&
           this.state.username.length>0 &&
           this.state.password.length>0 &&
           this.state.pass_confirm.length>0)
      {
        if(this.state.password===this.state.pass_confirm)
        {
          console.log("pass values to db here i think?")          
        }
        else
        {
          alert("The passwords have to be same");
        }
      }
      else
      {
        alert("Input value is missing");
      }
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


export default Register;