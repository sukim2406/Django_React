import React, { Component } from 'react'

export default class PersonalInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            new_password: "",
            new_password_confirm: "",
            new_api_key: this.props.accountInfo.api_key,
            new_secret_key: this.props.accountInfo.secret_key,
            password_change: false,
            api_change: false,
        }

        this.changePasswordClicked = this.changePasswordClicked.bind(this);
        this.changeAPIClicked = this.changeAPIClicked.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.handleNewPasswordConfirmCHange = this.handleNewPasswordConfirmCHange.bind(this);
        this.handleNewAPIKeyChange = this.handleNewAPIKeyChange.bind(this);
        this.handleNewSecretKeyChange = this.handleNewSecretKeyChange.bind(this);
        this.confirmClicked = this.confirmClicked.bind(this);   
    }

    changePasswordClicked(){
        this.setState({
            password_change: !this.state.password_change,
        })
    }

    changeAPIClicked(){
        this.setState({
            api_change: !this.state.api_change,
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
    }

    render() {
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
                                    <input value={this.state.new_password} onChange={this.handleNewPasswordChange} type="text"  />
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
                                    <input value={this.state.new_password_confirm} onChange={this.handleNewPasswordConfirmCHange} type="text" />
                                    <button onClick={this.changePasswordClicked}>Cancel</button>
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
