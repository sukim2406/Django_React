import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            input_email: "",
            input_password: "",
        }
    }
    render() {
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
                        <input value={this.state.input_email} placeholder="email" type="text"/>
                        <input value={this.state.input_password} placeholder="password" type="password"/>
                    </div>
                    <div className="login__btns">
                        <button>log in</button>
                        <button>register</button>
                    </div>
                </div>
            </div>
        )
    }
}
