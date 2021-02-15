import React, { Component } from 'react'
import PersonalInfo from './PersonalInfo'

export default class AccountInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            accountInfo: '',
            active: 'account',
        };

        this.accountClicked = this.accountClicked.bind(this);
        this.historyClicked = this.historyClicked.bind(this);
        this.depositsClicked = this.depositsClicked.bind(this);
    }
    
    accountClicked(){
        this.setState({
            active: 'account',
        })
    }

    historyClicked(){
        this.setState({
            active: 'history',
        })
    }

    depositsClicked(){
        this.setState({
            active: 'deposits',
        })
    }

    getAccountInfo(){
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'applicaton/json'}
        };
        fetch('/api/account-info', requestOptions)
        .then((response) => response.json())
        .then((data) => this.setState({accountInfo : data}));
    }

    componentDidMount(){
        this.getAccountInfo()
    }

    render() {
        return (
            <div className="accountInfo"> 
                <div className="accountInfo__tab">
                    <div className={this.state.active==="account" ? "accountInfo__item clicked" : "accountInfo__item"} onClick={this.accountClicked}>
                        <div className="accountInfo__tab__item">
                            <h3>My Account</h3>
                        </div>
                        <div className="accountInfo__tab__bar"/>
                    </div>
                    <div className={this.state.active==="history" ? "accountInfo__item clicked" : "accountInfo__item"} onClick={this.historyClicked}>
                        <div className="accountInfo__tab__item">
                            <h3>History</h3>
                        </div>
                        <div className="accountInfo__tab__bar" />
                    </div>
                    <div className={this.state.active==="deposits" ? "accountInfo__item clicked" : "accountInfo__item"} onClick={this.depositsClicked}>
                        <div className="accountInfo__tab__item">
                            <h3>Deposits</h3>
                        </div>
                        <div className="accountInfo__tab__bar" />
                    </div>
                </div>
                <div className="accountInfo__info">
                    {this.state.active === "account"? <PersonalInfo accountInfo={this.state.accountInfo}/>
                    :this.state.active === "history"?  "History tab here"
                    :this.state.active === "deposits"? "Deposit tab here"
                    :"Tab here"}
                </div>
                
            </div>
        )
    }
}
