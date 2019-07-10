import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';
import Datatables from './Datatables';

export default class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    componentClicked = () => {
        console.log("clicked");
    }

    componentFailure = () => {
        console.log("Failed");
    }

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
        let prompt;
        if(this.state.isLoggedIn) {
            prompt = null;
            fbContent = (
                <div style={{color: 'white'}}>
                    <br/>
                    <table className="headertable">
                        <tr>
                            <td>
                                <img className="profPic" src={this.state.picture} alt={this.state.name} />
                            </td>
                            <td>
                                <h2>{this.state.name}</h2>
                            </td>
                            <td>
                                email: {this.state.email} <br/>
                                userID: {this.state.userID}
                            </td>
                        </tr>
                    </table>
                    <br/><br/>
                    <Datatables />
                </div>
            );
        } else {
            prompt = (
            <div>
                <p>
                    To get started, <br/>Please Login With Facebook.
                    <br/><br/>
                </p>
            </div>
            )
            fbContent = 
            (<FacebookLogin
            appId="454141895144280"
            autoLoad={false}
            data-button-type="continue_with" 
            data-use-continue-as="true"
            data-width="" 
            data-size="large" 
            fields="name,email,picture"
            scope="public_profile,email"   // user_friends
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            onFailure={this.componentFailure} />
            );
        }

        return <div>{prompt}{fbContent}</div>;
    }
}
