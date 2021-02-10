import React, { Component } from "react";
import { render } from "react-dom";
import Homepage from "./Homepage";
import Header from "./Header";


export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            email: '',
            username: '',
        }

        this.isLoggedIn = this.isLoggedIn.bind(this);
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
        }));
    }

    componentDidMount(){
        this.isLoggedIn();
    }

    render() {
        return (
            <div className="App">
                <div className="App__header">
                    <Header userInfo={this.state}/>
                </div>
                <div className="App_body">
                    <Homepage isLoggedIn={this.isLoggedIn} userInfo={this.state}/>
                </div>
            </div>
        )
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);