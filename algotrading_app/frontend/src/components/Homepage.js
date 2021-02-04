import React, { Component } from 'react';
import Login from "./Login";
import Signup from "./CreateOrder";
import Order from "./Order";
import Register from "./Register";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

export default class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/'><p>This is the home page</p></Route>
                        <Route path='/login' component={Login}/>
                        <Route path='/register' component={Register} />
                        <Route path='/order/:order_id' component={Order} />
                        <Route path='/createorder' component={Signup}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}
