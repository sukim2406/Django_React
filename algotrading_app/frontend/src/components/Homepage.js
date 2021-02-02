import React, { Component } from 'react';
import Login from "./Login";
import Signup from "./CreateOrder";
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
                        <Route path='/createorder' component={Signup}/>
                        <Route path='/login' component={Login}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}
