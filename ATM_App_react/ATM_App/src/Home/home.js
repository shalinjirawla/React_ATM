import React, { Component } from 'react';
import LogoutComponent from '../Logout/logout';
import "./home.css";
import './style.bundle.css';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isError: false,
            id: '',
            username: "",
            balance: '',
            savings: ''
        }
        const isError = false;
    }
    componentWillMount() {
        let userData = localStorage.getItem("userData");
        if (userData != null || userData != undefined) {
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
    }
    getUserInfo(id) {
        var data = JSON.parse(localStorage.getItem('accData'));
        if (data != null || data != undefined) {
            this.setState({ balance: data.balance, savings: data.savings });
        }
    }
    withdraw() {
        this.props.history.push('/' + this.state.id + '/withdraw/');
    }
    deposit() {
        this.props.history.push('/' + this.state.id + '/deposit/');
    }
    ShowBalance() {
        let userData = localStorage.getItem("userData");
        let data = JSON.parse(userData);
        this.props.history.push(data.id + '/balance');
    }
    WithdrawCash() {
        let userData = localStorage.getItem("userData");
        let data = JSON.parse(userData);
        this.props.history.push(data.id + '/withdraw');
    }
    DepositCash() {
        let userData = localStorage.getItem("userData");
        let data = JSON.parse(userData);
        this.props.history.push(data.id + '/deposit');
    }
    AccountBalance() {
        this.props.history.push(this.state.id + '/balance');
    }
    render() {
        const logout = new LogoutComponent();
        const TL50 = {
            top: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            textAlign: 'center'
        }
        const fullHeight = {
            height: '-webkit-fill-available'
        }
        return (

            <div>
                <div className='m-content alignCenter '>
                    <div class="m-portlet m-portlet--tabs bgColorBlue">
                        <div class="m-portlet__head">
                            <div class="m-portlet__head-caption">
                                <div class="row">
                                    <div class="middle alignLeft col-md-3 colorW fontz2">
                                        <i class="fa fa-home colorWhite fontz2 hand" aria-hidden="true"></i> Home
                                    </div>
                                    <div class="middle col-md-9 alignRight colorW fontz2">
                                        <i class="fa fa-power-off colorWhite fontz2 hand" onClick={logout.Logout.bind(this)} aria-hidden="true"></i> Logout
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-portlet__body">
                            <div className="col-md-12">
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <h5>
                                                Welcome
                                            </h5>
                                            <h3>{this.state.username}</h3>
                                        </div>
                                        <div className="form-group">
                                            <h5>
                                                Balance
                                            </h5>
                                            <h3>$ {this.state.balance}</h3>
                                        </div>
                                        <div className="form-group">
                                            <h5>
                                                Savings
                                            </h5>
                                            <h3>$ {this.state.savings}</h3>
                                        </div>
                                    </div>
                                    <div className='col-md-8'>
                                        <div className=''>
                                            <div className='row form-group'>
                                                <div className='col-md-6'>
                                                    <button class="btn balanceBtn btn-block m-btn--square  m-btn m-btn--gradient-from-info m-btn--gradient-to-accent"
                                                        type="button" onClick={this.withdraw.bind(this)}>
                                                        Cash Withdraw
                                                </button>
                                                </div>
                                                <div className='col-md-6'>
                                                    <button class="btn balanceBtn btn-block m-btn--square  m-btn m-btn--gradient-from-info m-btn--gradient-to-accent"
                                                        type="button" onClick={this.deposit.bind(this)}>
                                                        Cash Deposit
                                            </button>
                                                </div>
                                            </div>
                                            <div className='row form-group'>
                                                <div className='col-md-6'>
                                                    <button class="btn balanceBtn btn-block m-btn--square  m-btn m-btn--gradient-from-info m-btn--gradient-to-accent"
                                                        type="button" onClick={this.AccountBalance.bind(this)}>
                                                        Account Balance
                                                    </button>
                                                </div>
                                                <div className='col-md-6'>
                                                    <button class="btn balanceBtn btn-block m-btn--square  m-btn m-btn--gradient-from-info m-btn--gradient-to-accent" type="button">
                                                        Payment
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='row form-group'>
                                                <div className='col-md-6'>
                                                    <button class="btn balanceBtn btn-block m-btn--square  m-btn m-btn--gradient-from-info m-btn--gradient-to-accent" type="button">
                                                        Account Settings
                                                </button>
                                                </div>
                                                <div className='col-md-6'>
                                                    <button class="btn balanceBtn btn-block m-btn--square  m-btn m-btn--gradient-from-info m-btn--gradient-to-accent" type="button">
                                                        Credit Card
                                            </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}




export default Home;