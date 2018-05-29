import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';
import './withdraw.css';
import LogoutComponent from '../Logout/logout';

class WithdrawComponent extends Component {
    constructor() {
        super();
        this.state = {
            showWarn: false,
            showAlert: false,
            showSuccess: false,
            withdrawAmount: null,
            id: '',
            username: "",
            balance: 0,
            accountno: ''
        }
    }
    componentWillMount() {
        let userData = localStorage.getItem("userData");
        let id = JSON.parse(userData).id;
        let username = JSON.parse(userData).username;
        this.setState({ id: id });
        this.setState({ username: username });
        this.getUserInfo(id);
    }
    getUserInfo(id) {
        var data = JSON.parse(localStorage.getItem('accData'));
        if (data != null || data != undefined) {
            this.setState({ balance: data.balance, accountno: data.accountno });
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    Gohome() {
        this.props.history.push('/home')
    }
    WithdrawAmount() {
        
        if (this.state.withdrawAmount != null) {
            let withdrawAmount = parseInt(this.state.withdrawAmount);
            let balance = parseInt(this.state.balance);
            if (withdrawAmount > balance) {
                this.setState({ showAlert: true });
            }
            else {
                let currentAmount = balance - withdrawAmount;
                this.setState({
                    balance: currentAmount,
                });
                this.props.history.push('/' + this.state.id + '/withdraw/' + withdrawAmount);
            }
        }
        else {
            this.setState({ showWarn: true });
        }

    }
    render() {
        const logout = new LogoutComponent();
        return (
            <div>
                <SweetAlert
                    show={this.state.showWarn}
                    title="Warnnig!"
                    text="Please enter Amount to withdraw!"
                    onConfirm={() => this.setState({ showWarn: false })}
                />
                <SweetAlert
                    show={this.state.showAlert}
                    title="Warnnig!"
                    text="You don't have enough gains for withdrawal!"
                    onConfirm={() => this.setState({ showAlert: false })}
                />
                <SweetAlert
                    show={this.state.showSuccess}
                    title="Success!"
                    text="Please collect your cash!"
                    onConfirm={() => this.setState({ showSuccess: false })}
                />
                <div className='m-content alignCenter '>
                    <div class="m-portlet m-portlet--tabs bgColorBlue">
                        <div class="m-portlet__head">
                            <div class="m-portlet__head-caption">
                                <div className="row">
                                    <div class="middle alignLeft col-md-3 colorW fontz2">
                                        <i class="fa fa-home colorWhite fontz2 hand" onClick={this.Gohome.bind(this)} aria-hidden="true"></i> Home
                                    </div>
                                    <div className='middle col-md-4'>
                                        <h2 class="m-portlet__head-text fontz2">
                                            <b className="colorW">Cash Withdraw</b>
                                        </h2>
                                    </div>
                                    <div class="middle alignRight col-md-5 colorW fontz2">
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
                                                Account No
                                            </h5>
                                            <h3>{this.state.accountno}</h3>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <input id="withdrawAmount" placeholder="Enter Amount" type="number" class="balanceInput form-control m-input m-input--square" onChange={this.handleChange.bind(this)} value={this.state.withdrawAmount} />
                                        </div>
                                        <div className='row form-group'>
                                            <div className='col-md-6'>
                                                <button class="btn balanceBtn btn-block m-btn--square  m-btn m-btn--gradient-from-info m-btn--gradient-to-accent"
                                                    type="button" onClick={() => this.setState({ withdrawAmount: 20 })}>
                                                    $ 20
                                                </button>
                                            </div>
                                            <div className='col-md-6'>
                                                <button class="btn balanceBtn btn-block m-btn--square  m-btn m-btn--gradient-from-info m-btn--gradient-to-accent"
                                                    type="button" onClick={() => this.setState({ withdrawAmount: 50 })}>
                                                    $ 50
                                                </button>
                                            </div>
                                        </div>
                                        <div className='row form-group'>
                                            <div className='col-md-6'>
                                                <button class="btn balanceBtn btn-block m-btn--square  m-btn m-btn--gradient-from-info m-btn--gradient-to-accent"
                                                    type="button" onClick={() => this.setState({ withdrawAmount: 70 })}>
                                                    $ 70
                                                </button>
                                            </div>
                                            <div className='col-md-6'>
                                                <button class="btn balanceBtn btn-block m-btn--square  m-btn m-btn--gradient-from-info m-btn--gradient-to-accent"
                                                    type="button" onClick={() => this.setState({ withdrawAmount: 200 })}>
                                                    $ 200
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className='row'>
                                    <div className='col-md-3'>
                                    </div>
                                    <div className='col-md-8'>
                                        <div className='row form-group'>
                                            <div className='col-md-12'>
                                                <button class="btn balanceBtnPink btn-block m-btn--square  m-btn m-btn--gradient-from-info m-btn--gradient-to-accent"
                                                    type="button" onClick={this.WithdrawAmount.bind(this)}>
                                                    <i class="fa fa-check Font27" aria-hidden="true"></i>&nbsp;Withdraw
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
        )
    }
}

export default WithdrawComponent;