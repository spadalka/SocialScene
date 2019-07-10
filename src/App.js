import React, { Component } from 'react';
import './App.css';
import Facebook from './components/Facebook';


class App extends Component { 

    render() {
      return(
      <div className="App">
        <header className="App-header"> 
          <h1>SocialScene</h1>
        </header>
      <Facebook />
      </div>
    );
  }
}


export default App;

// {this.state.login}

// import fb from './components/Facebook';
// <p>
// To get started, <br/>Please login with your Facebook Profile.
// <br/><br/>
// { <FacebookLoginButton className="fb-login-button" 
//     data-width="" 
//     data-size="large" 
//     data-button-type="continue_with" 
//     data-auto-logout-link="false" 
//     data-use-continue-as="true"
//       /> }
// </p>
// {/* <fb:login-button scope="public_profile" onlogin="checkLoginState();" /> */}
// <div className="fb-login-button" 
//     data-width="" 
//     data-size="large" 
//     data-button-type="continue_with" 
//     data-auto-logout-link="false" 
//     data-use-continue-as="true">
// </div>
