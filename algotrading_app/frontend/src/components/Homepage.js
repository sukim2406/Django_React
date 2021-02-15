import React, { Component } from 'react';
import Login from "./Login";
import Signup from "./CreateOrder";
import Order from "./Order";
import Register from "./Register";
import Logout from "./Logout";
import AccountInfo from "./AccountInfo"
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

export default class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    refreshPage(){
        window.location.reload(false);
    }

    render() {
        return (
            <div className="Homepage">
                <Router>
                    <Switch>
                        <Route exact path='/'><p>This is the home page</p></Route>
                        {/* <Route path='/login' component={Login} updateState={this.props.updateSttate}/> */}
                        <Route path='/login' render={(props) => <Login {...props} isLoggedIn={this.props.isLoggedIn} userInfo={this.props.userInfo} />} />
                        <Route path='/logout' render={(props) => <Logout {...props} isLoggedIn={this.props.isLoggedIn} userInfo={this.props.userInfo}/>} />
                        <Route path='/register' render={(props) => <Register {...props} isLoggedIn={this.props.isLoggedIn} userInfo={this.props.userInfo} /> } />
                        <Route path='/order/:order_id' component={Order} />
                        <Route path='/createorder' component={Signup}/>
                        <Route path='/account-info' component={AccountInfo} />
                    </Switch>
                </Router>
            </div>
        )
    }
}
