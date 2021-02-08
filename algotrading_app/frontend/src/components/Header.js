import React, { Component } from 'react'

export default class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            username: '',
            search_input: '',
        }

        this.logoutClicked = this.logoutClicked.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
    }

    handleSearchInput(e) {
        const value = e.target.value;
        this.setState({
            search_input: value,
        })
    }

    isLoggedIn(){
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('/api/get-account', requestOptions)
        .then((response) => response.json())
        .then((data) => this.setState({
            email: data.email,
            username: data.username
        }))
    }

    logoutClicked(){
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('/api/logout', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
    }

    componentDidMount() {
        this.isLoggedIn();
    }
    render() {
        console.log(this.state)
        return (
            <div className="Header">
                <div className="Header__logo">
                    <img src="../../static/images/Billstacx-logo.svg"></img>
                </div>
                <div className="Header__search">
                    <input value={this.state.search_input} 
                        onChange={this.handleSearchInput} 
                        placeholder={this.state.email === "" ? "Log in to search tickers" : "Ticker (ex.SPY)"} type="text" 
                        disabled={this.state.email === ""? "disabled" : ""}
                    />
                </div>
                <div className="Header__hamburger">
                    <i class="fas fa-bars"></i>
                </div>
                <div className="Header__menuItems">
                    <nav>
                        <ul className="Header__navLinks">
                            <li><a className="Header__navLink" href='#'>Item 1</a></li>
                            {this.state.email === ""? 
                                <li><a className="Header__navLink" href="#">Register</a></li>
                            : null}
                            {this.state.email === ""?   
                                <li><a className="Header__navLink" href="/login/">Log In</a></li> 
                            : 
                                <li><a className="Header__navLink" onClick={this.logoutClicked} href="/login/">Log Out</a></li>}
                        </ul>                        
                    </nav>
                </div>
            </div>
        )
    }
}
