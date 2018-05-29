import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login/login';
import Home from './Home/home';
import BalanceComponent from './Balance/balance';
import WithdrawComponent from './Withdraw/withdraw';
import DepositComponent from './Deposit/deposit';
import WithdrawSuccess from './Withdraw/withdrawsuccess';
import DepositSuccess from './Deposit/depositsuccess';

class RouteComponent extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/Home" component={Home}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/:id/balance" component={BalanceComponent}></Route>
                    <Route exact path="/:id/withdraw" component={WithdrawComponent}></Route>
                    <Route exact path="/:id/withdraw/:amount" component={WithdrawSuccess}></Route>
                    <Route exact path="/:id/deposit" component={DepositComponent}></Route>
                    <Route exact path="/:id/deposit/:amount" component={DepositSuccess}></Route>
                </div>
            </Router>
        )
    }
}

export default RouteComponent;