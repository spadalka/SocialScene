import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Currfile from './Register';

class Register extends Component { 
    constructor(props){
      super(props);

      var screen=[];
      screen.push(
        <header className="App-header" key="register_screen">
          <h1>SocialScene</h1>
          <div>
            <button id="currfile" disabled> Register </button>
            &nbsp;
            &nbsp;
            <button onClick={(event) => this.login_evnt(event)}> Login </button>
          </div>
          &nbsp;
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
            <button id="register_button" onClick={(event) => this.passVal(event)} >Submit</button>
          </form>


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

    register_evnt(event) {
        this.setState({ screen:<Currfile /> })
    }

    passVal(event){
      event.preventDefault();
      let data = {
        fname:this.state.fname,
        lname:this.state.lname,
        username:this.state.username,
        password:this.state.password
      };

      var request = new Request('http://localhost:5000/api/newuser', {
        method: 'POST',
        headers: new  Headers({'Content-Type':'application/json'}),
        body: JSON.stringify(data)
      });

       
      fetch(request)
        .then(function(response){
          response.json()
            .then(function(data){
              console.log(data)
            })
        })

        .catch(function(err) {
          console.log(err)
        })

        this.setState({ screen:<Currfile /> })
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