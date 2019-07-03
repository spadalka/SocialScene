import React from "react";
import NavBar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      {/* New - use BrowserRouter to provide access to /profile */}
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import React, { Component } from 'react';
// import './App.css';
// import Login from './Login';
// import Register from './Register';

// class App extends Component { 
//     constructor(props){
//       super(props);

//       var screen=[];
//       screen.push(
//         <header className="App-header" key="splash_screen">
//           <h1>SocialScene</h1>
//           <div>
          
//           To get started, <br/>Please choose an option.

//           <br/>
//           <br/>
          
//           <div>
//             <button onClick={(event) => this.login_evnt(event)}> Login </button>
//           </div>

//           &nbsp;
//           <br/>

//           <div>
//             <button onClick={(event) => this.register_evnt(event)}> Register </button>
//           </div>
//           </div>
//         </header>
//       )

//       this.state={
//         screen:screen
//       }
//     }

//     login_evnt(event){
//         this.setState({ screen:<Login /> })
//     }

//     register_evnt(event){
//         this.setState({ screen:<Register /> })
//     }

//     render() {
//       return (
//         <div className="App">
//             {this.state.screen}
//         </div>
//       );
//     }
//   }


// export default App;

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
