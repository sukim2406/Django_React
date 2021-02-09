import React, { Component } from 'react'
import { MenuItems } from './MenuItems'
import {MenuItemsLoggedIn } from './MenuItems'

export default class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            username: '',
            search_input: '',
            hamburgerClicked: false,
        }

        this.logoutClicked = this.logoutClicked.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    }

    handleHamburgerClick = () => {
        this.setState({
            hamburgerClicked: !this.state.hamburgerClicked,
        })
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
            username: data.username,
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
        return(      
            <nav className="Header">
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
                    <i className={this.state.hamburgerClicked ? 'fas fa-times' : 'fas fa-bars'} onClick={this.handleHamburgerClick}></i>
                </div>
                <ul className={this.state.hamburgerClicked ? 'Header__nav active' : 'Header__nav'}>
                    {this.state.email === "" ?  
                        MenuItems.map((item, index) => {
                            return (
                                <li key={index}><a className={item.cName} href={item.url}>{item.title}</a></li>    
                            )
                        })
                        :
                            MenuItemsLoggedIn.map((item, index) => {
                            return (
                                <li key={index}><a className={item.cName} href={item.url}>{item.title}</a></li>
                            )
                        })
                    }
                </ul>
            </nav>
        )
    }
}
