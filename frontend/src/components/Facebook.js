import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';

export default class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    componentClicked = () => console.log("clicked");

    responseFacebook = response => {
        console.log(response);
        this.setState({ 
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url,
         })
    }

    render() {
        let fbContent;
        if(this.state.isLoggedIn) {
            fbContent = (
                <div style={{color: 'white'}}>
                    <img src={this.state.picture} alt={this.state.name} />
                    <h2>Welcome, {this.state.name}</h2>
                    email: {this.state.email}
                </div>
            );
        } else {
            fbContent = (<FacebookLogin
            appId="454141895144280"
            autoLoad={true}
            fields="name,email,picture"
            scope="public_profile,user_friends"
            onClick={this.componentClicked}
            callback={this.responseFacebook} />);
        }
        return (
            <div>
                {fbContent}
            </div>
        )
    }
}
