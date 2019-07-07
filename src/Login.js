import React, { Component } from 'react';
import './App.css';
import Register from './Register';
import Currfile from './Login';

class Login extends Component { 
    constructor(props){
      super(props);

      var screen=[];
      screen.push(
        <header className="App-header" key="login_screen">
          <h1>SocialScene</h1>
          <div>
            <button onClick={(event) => this.register_evnt(event)}> Register </button>
            &nbsp;
            &nbsp;
            <button id="currfile" disabled> Login </button>
          </div>
          &nbsp;
          <h2>Login</h2>

          <form onSubmit={this.submit}>
            <table>
              <tbody>

                <tr>
                  <td>Enter your email: &nbsp;</td>
                  <td><input type="email" id="login_user" required onChange={(event) => this.change(event)} /></td>
                </tr>

                <tr>
                  <td>Enter your password: &nbsp;</td>
                  <td><input type="password" id="login_pass" required onChange={(event) => this.change(event)} /></td>
                </tr>

              </tbody>
            </table>

            <br/>
            <button id="login_button" onClick={(event) => this.chkVal(event)} >Submit</button>
          </form>

        </header>
      )

      this.state={
        login_user:'',
        login_pass:'',
        screen:screen
      }
    }

    register_evnt(event){
        this.setState({ screen:<Register /> })
    }

    login_evnt(event) {
        this.setState({ screen:<Currfile /> })
    }

    chkVal(event){
      event.preventDefault();
      let data = {
        login_user:this.state.login_user,
        login_pass:this.state.login_pass
      };

      var request = new Request('http://localhost:5000/api/chkuser', {
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


export default Login;