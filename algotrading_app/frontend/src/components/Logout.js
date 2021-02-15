import React, { Component } from 'react'

export default class Logout extends Component {
    constructor(props){
        super(props);
    }

    logout(){
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('/api/logout/', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    render() {
        this.logout();
        return (
            <div className="logout">
                <div className="logout__header">
                    <div>
                        <h4>even if you are away</h4>
                        <h3>we will keep on</h3>
                        <h2>BILLSTACX-ing</h2>
                    </div>
                </div>                
                <div className="logout__contents">
                    <div className="logout__contents__btn">
                        <p>already miss us?  <a href='/login'>log in</a></p>
                    </div>
                </div>
            </div>
        )
    }
}
