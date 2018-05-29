import React, { Component } from 'react';
import logo from '../logo.svg';
import './balance.css';
import LogoutComponent from '../Logout/logout';

function Error(props) {
    if (props.isError) {
        return <h1>Something went wrong!</h1>
    }
    else {
        return <h1></h1>;
    }
}

class BalanceComponent extends Component {
    constructor() {
        super();
        this.state = {
            isError: false,
            id: '',
            username: "",
            balance: ''
        }
        const isError = false;
    }

    componentWillMount() {
        let userData = localStorage.getItem("userData");
        let id = JSON.parse(userData).id;
        let username = JSON.parse(userData).username;
        this.setState({ id: id });
        this.setState({ username: username });
        this.getUserInfo(id);
        if (window.location.href.indexOf(id + "/balance") > -1) {

            this.isError = true;
        }
        else {
            // this.setState({ isError: true });
        }
    }
    getUserInfo(id) {
        var data = JSON.parse(localStorage.getItem('accData'));
        if (data != null || data != undefined) {
            this.setState({ balance: data.balance });
        }
    }
    withdraw() {
        this.props.history.push('/' + this.state.id + '/withdraw/');
    }
    deposit() {
        this.props.history.push('/' + this.state.id + '/deposit/');
    }
    Gohome() {
        this.props.history.push('/home')
    }
    render() {
        const logout = new LogoutComponent();
        return (
            <div>
                <div className='m-content alignCenter '>
                    <div class="m-portlet m-portlet--tabs bgColorBlue">
                        <div class="m-portlet__head">
                            <div class="m-portlet__head-caption">
                                <div class="row">
                                    <div class="middle alignLeft col-md-3 colorW fontz2">
                                        <i class="fa fa-home colorWhite fontz2 hand" onClick={this.Gohome.bind(this)} aria-hidden="true"></i> Home
                                    </div>
                                    <div className='middle col-md-4'>
                                        <h2 class="fontz2">
                                            <b className="colorW"></b>
                                        </h2>
                                    </div>
                                    <div class="middle alignRight col-md-5 colorW fontz2">
                                        <i class="fa fa-power-off colorWhite fontz2 hand" onClick={logout.Logout.bind(this)} aria-hidden="true"></i> Logout
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className='container'>
                            <h2 className='colorW display-3'>
                            Your account balance is $ {this.state.balance}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BalanceComponent;