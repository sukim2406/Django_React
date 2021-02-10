import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom"

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            api_key: "",
            secret_key: "",
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleApiKeyChange = this.handleApiKeyChange.bind(this);
        this.handleSecretKeyChange = this.handleSecretKeyChange.bind(this);
        this.handleRegisterButtonClicked = this.handleRegisterButtonClicked.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleEmailChange(e){
        this.setState({
            email: e.target.value
        })
    }
    
    handleUsernameChange(e){
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        })
    }

    handleApiKeyChange(e){
        this.setState({
            api_key: e.target.value
        })
    }

    handleSecretKeyChange(e){
        this.setState({
            secret_key: e.target.value
        })
    }

    autoLogin(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        };
        fetch('/api/login/', requestOptions)
        .then((response) => response.json())
        .then((data) => data.status === "Successful" ? this.loggedIn(): console.log("login failed"));
    }


    handleRegisterButtonClicked(){
        console.log(this.state);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                api_key: this.state.api_key,
                secret_key: this.state.secret_key,
            })
        };
        fetch('/api/create-account/', requestOptions)
        .then((response) => response.json())
        .then((data) => data.email !== ''? this.autoLogin(): console.log("failed register"));
    }

    loggedIn(){
        this.props.isLoggedIn()
    }

    loginClicked(){
        this.props.history.push('/login');
    }

    render() {
        if(this.props.userInfo.email !== ''){
            return <Redirect to='/' />
        }
        return (
            <div className="register">
                <div className="register__header">
                    <div>
                        <h2>Welcome</h2>
                        <h3>to</h3>
                        <h1>BILLSTACX</h1>
                    </div>
                </div>
                <div className="register__contents">
                    <div className="register__inputs">
                        <div className="register__inputs__email">
                            <h3>Email</h3>
                            <input value={this.state.email} onChange={this.handleEmailChange} placeholder="email" type="text"/>
                        </div>
                        <div style={{ height: "1vh" }}></div>
                        <div className="register__inputs__username">
                            <h3>Username</h3>
                            <input value={this.state.username} onChange={this.handleUsernameChange} placeholder="username" type="text"/>
                        </div>
                        <div style={{ height: "1vh" }}></div>
                        <div className="register__inputs__password">
                            <h3>Password</h3>
                            <input value={this.state.password} onChange={this.handlePasswordChange} placeholder="password" type="password"/>
                            <p>minimum 6 digits</p>
                        </div>
                        <div style={{ height: "1vh" }}></div>
                        <div className="register__inputs__api">
                            <h3>Alpaca API Key</h3>
                            <input value={this.state.api_key} onChange={this.handleApiKeyChange} placeholder="API key" type="text"/>
                        </div>
                        <div style={{ height: "1vh" }}></div>
                        <div className="register__inputs__secret">
                            <h3>Alpaca Secret API Key</h3>
                            <input value={this.state.secret_key} onChange={this.handleSecretKeyChange} placeholder="Secret key" type="text"/>
                        </div>
                    </div>
                    <div style={{ height: "5vh" }}></div>
                    <div className="login__btns">
                        <button onClick={this.handleRegisterButtonClicked}>Register</button>
                        <button onClick={this.loginClicked}>Log In</button>
                    </div>    
                </div>
            </div>
        )
    }
}
