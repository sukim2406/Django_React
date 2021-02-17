import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class PersonalInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            cur_password: "",
            new_password: "",
            new_password_confirm: "",
            new_api_key: this.props.accountInfo.api_key,
            new_secret_key: this.props.accountInfo.secret_key,
            password_change: false,
            api_change: false,
            error_msg: '',
            show_error: false,
            accountInfoChanged: false,
        }

        this.changePasswordClicked = this.changePasswordClicked.bind(this);
        this.changeAPIClicked = this.changeAPIClicked.bind(this);
        this.handleCurrentPasswordChange = this.handleCurrentPasswordChange.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.handleNewPasswordConfirmCHange = this.handleNewPasswordConfirmCHange.bind(this);
        this.handleNewAPIKeyChange = this.handleNewAPIKeyChange.bind(this);
        this.handleNewSecretKeyChange = this.handleNewSecretKeyChange.bind(this);
        this.confirmClicked = this.confirmClicked.bind(this);   
    }

    resetNewPassword(){
        this.setState({
            new_password: '',
            new_password_confirm: '',
            cur_password: '',
        })
    }

    resetNewAPIKeys(){
        this.setState({
            new_api_key: this.props.accountInfo.api_key,
            new_secret_key: this.props.accountInfo.secret_key,
        })
    }

    changePasswordClicked(){
        this.resetNewPassword();
        this.setState({
            password_change: !this.state.password_change,
        })
    }

    changeAPIClicked(){
        this.resetNewAPIKeys();
        this.setState({
            api_change: !this.state.api_change,
        })
    }

    handleCurrentPasswordChange(e){
        const value = e.target.value;
        this.setState({
            cur_password: value,
        })
    }
    handleNewPasswordChange(e){
        const value = e.target.value;
        this.setState({
            new_password: value,
        })
    }

    handleNewPasswordConfirmCHange(e){
        const value = e.target.value;
        this.setState({
            new_password_confirm: value,
        })
    }

    handleNewAPIKeyChange(e){
        const value = e.target.value;
        this.setState({
            new_api_key: value,
        })
    }

    handleNewSecretKeyChange(e){
        const value = e.target.value;
        this.setState({
            new_secret_key: value,
        })
    }

    confirmClicked(){
        console.log(this.state);
        if(!this.state.password_change || this.validatePassword()){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.props.accountInfo.email,
                    cur_password: this.state.cur_password,
                    new_password: this.state.password_change ? this.state.new_password : this.state.cur_password,
                    api_key: this.state.api_change? this.state.new_api_key : this.props.accountInfo.api_key,
                    secret_key: this.state.api_change ? this.state.new_secret_key : this.props.accountInfo.secret_key,
                })
            };
            fetch('/api/update-account/', requestOptions)
            .then((response) => response.json())
            .then((data) => data.status==="success" ? this.setState({accountInfoChanged : true}) : "");
        }
        else{
            this.setState({
                show_error: true,
            })
        }
    }

    validatePassword(){
        if(this.state.new_password != this.state.new_password_confirm){
            this.setState({
                error_msg: "password did not match",
            })
            return false;
        }
        else if(this.state.new_password.length <= 6){
            console.log(this.state.new_password.length);
            this.setState({
                error_msg: "password must be longer then 6 characters",
            })
            return false;
        }
        else{
            return true;
        }
    }


    render() {
        if(this.state.accountInfoChanged){
            return <Redirect to='/logout/' />
        }
        return (
            <div className="personalInfo">
                    <div className="personalInfo__header">
                        <h1>Hello {this.props.accountInfo.username}</h1>
                        <h3>Hello {this.props.accountInfo.username}</h3>
                    </div>
                    <div className="personalInfo__content">
                        <div className="personalInfo__content__item">
                            <h3>Email</h3>
                            <input value={this.props.accountInfo.email} type="text" disabled />
                        </div>
                        <div className="personalInfo__content__item">
                            <h3>Username</h3>
                            <input value={this.props.accountInfo.username} type="text" disabled />
                        </div>
                        { this.state.password_change ? 
                                <div className="personalInfo__content__item">
                                    <h3>New Password</h3>
                                    <input value={this.state.new_password} onChange={this.handleNewPasswordChange} type="password"  />
                                </div>
                            : 
                                <div className="personalInfo__content__item">
                                    <h3>Password (Hashed)</h3>
                                    <input value={this.props.accountInfo.password} type="text" disabled />
                                </div>
                        }

                        { this.state.password_change ? 
                                <div className="personalInfo__content__item">
                                    <h3>New Password Confirm</h3>
                                    <input value={this.state.new_password_confirm} onChange={this.handleNewPasswordConfirmCHange} type="password" />
                                    <button onClick={this.changePasswordClicked}>Cancel</button>
                                    <p style={{ color: "red" , display: this.state.show_error ? "contents" : "none" }}>{this.state.error_msg}</p>
                                </div>
                            : 
                                <div className="personalInfo__content__item">
                                    <h3>Change Password</h3>
                                    <button onClick={this.changePasswordClicked}>Change Password</button>
                                    
                                </div>
                        }
                        
                        {   this.state.api_change ?
                                <div className="personalInfo__content__item">
                                    <h3>Alpaca API key</h3>
                                    <input value={this.state.new_api_key} onChange={this.handleNewAPIKeyChange} type="text" />
                                </div>
                            :
                                <div className="personalInfo__content__item">
                                    <h3>Alpaca API key</h3>
                                    <input value={this.props.accountInfo.api_key} type="text" disabled/>
                                </div>
                        }
                        
                        {   this.state.api_change ?
                                <div className="personalInfo__content__item">
                                    <h3>Alpaca Secret key</h3>
                                    <input value={this.state.new_secret_key} onChange={this.handleNewSecretKeyChange} type="text" />
                                </div>
                            :
                                <div className="personalInfo__content__item">
                                    <h3>Alpaca Secret key</h3>
                                    <input value={this.props.accountInfo.secret_key} type="text" disabled />
                                </div>

                        }
                        
                        <div className="personalInfo__content__item">
                            <h3>Change API Keys</h3>
                            <button onClick={this.changeAPIClicked}>{this.state.api_change? "Cancel" : "Change API keys"}</button>
                        </div>
                        <div className="personalInfo__content__item">
                            <h3>User since</h3>
                            <input value={this.props.accountInfo.date_joined} type="text" disabled />
                        </div>
                        { this.state.password_change || this.state.api_change ?
                                <div className="personalInfo__content__item">
                                    <h3>Current Password</h3>
                                    <input value={this.state.cur_password} onChange={this.handleCurrentPasswordChange} type="password"  />  
                                </div>
                            :
                            <div></div>
                        }
                    </div>
                    <div className="personalInfo__btns">
                        <div className="personalInfo__btns__confirm">
                            <button onClick={this.confirmClicked}>confirm</button>
                        </div>
                        <div className="personalInfo__btns__cancel">
                            <button>cancel</button>
                        </div>
                    </div>
            </div>
        )
    }
}
