import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            input_email: "",
            input_password: "",
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
        this.registerClicked = this.registerClicked.bind(this);
    }
    
    handleEmailChange(e){
        const value = e.target.value;
        this.setState({
            input_email: value,
        });
    }

    handlePasswordChange(e){
        const value = e.target.value;
        this.setState({
            input_password: value,
        });
    }

    loginClicked(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.input_email,
                password: this.state.input_password,
            })
        };
        fetch('/api/login/', requestOptions)
        .then((response) => response.json())
        .then((data) => data.status === "Successful" ? this.loggedIn(): console.log("login failed"));
    }

    loggedIn(){
        this.props.isLoggedIn()
    }

    registerClicked(){
        this.props.history.push('/register');
    }
    render() {
        if(this.props.userInfo.email !== ''){
            return <Redirect to='/'/>
        }

        return (
            <div className="login">
                <div className="login__header">
                    <div>
                        <h2>Welcome</h2>
                        <h3>to</h3>
                        <h1>BILLSTACX</h1>
                    </div>
                </div>
                <div className="login__contents">
                    <div className="login__inputs">
                        <div className="login__inputs__email">
                            <h3>EMAIL</h3>
                            <input value={this.state.input_email} onChange={this.handleEmailChange} placeholder="email" type="text"/>
                        </div>
                        <div style={{ height: "1vh" }}></div>
                        <div className="login__inputs__password">
                            <h3>PASSWORD</h3>
                           <input value={this.state.input_password} onChange={this.handlePasswordChange} placeholder="password" type="password"/>
                        </div>
                    </div>
                    <div style={{ height: "5vh" }}></div>
                    <div className="login__btns">
                        <button onClick={this.loginClicked}>log in</button>
                        <div style={{ height: "1vh" }}></div>
                        <button onClick={this.registerClicked}>register</button>
                    </div>
                </div>
            </div>
        )
    }
}
