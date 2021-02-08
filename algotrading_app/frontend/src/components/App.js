import React, { Component } from "react";
import { render } from "react-dom";
import Homepage from "./Homepage";
import Header from "./Header";


export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="App">
                <div className="App__header">
                    <Header />
                </div>
                <div className="App_body">
                    <Homepage />
                </div>
            </div>
        )
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);