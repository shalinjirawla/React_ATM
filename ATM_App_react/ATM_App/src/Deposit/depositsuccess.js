import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';
import './depositsuccess.css';
import LogoutComponent from '../Logout/logout';

class DepositSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            showSuccess: false,
            withdrawAmount: 0,
            id: '',
            username: "",
            balance: 0
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
        var data = require('../Data/Account.json');
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                this.setState({ balance: data[i].balance });
            }
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    WithdrawAmount() {
        let withdrawAmount = parseInt(this.state.withdrawAmount);
        let balance = parseInt(this.state.balance);
        if (withdrawAmount > balance) {
            this.setState({ showAlert: true });
        }
        else {
            let currentAmount = balance - withdrawAmount;
            this.setState({
                balance: currentAmount,
                showSuccess: true,
                withdrawAmount: 0
            });
        }
    }
    Confirm() {
        var data = JSON.parse(localStorage.getItem('accData'));
        var accdata = JSON.parse(localStorage.getItem('accData'));
        accdata.balance = parseInt(data.balance) + parseInt(this.props.match.params.amount);
        localStorage.setItem('accData', JSON.stringify(accdata));
        this.props.history.push('/home');
    }
    Cancel() {
        this.props.history.push('/home');
    }
    Gohome() {
        this.props.history.push('/home')
    }
    render() {
        const logout = new LogoutComponent();
        const alignCenter = {
            textAlign: 'center'
        }
        const marginTop = {
            paddingTop: '5rem'
        }
        return (
            <div>
                <div className='m-content'>
                    <div class="m-portlet m-portlet--tabs bgColorBlue">
                        <div class="m-portlet__head">
                            <div class="m-portlet__head-caption">
                                <div className="row">
                                    <div class="middle alignLeft col-md-3 colorW fontz2">
                                        <i class="fa fa-home colorWhite fontz2 hand" onClick={this.Gohome.bind(this)} aria-hidden="true"></i> Home
                                    </div>
                                    <div className='middle col-md-4'>
                                        <h2 class="m-portlet__head-text fontz2">
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
                                $ {this.props.match.params.amount}
                            </h2>
                            <h1 className='colorW'>Credited to your account.</h1>
                            <div className="col-md-12" style={marginTop}>
                                <div className='row'>
                                    <div className='col-md-6 alignRight'>
                                        <button class="btn balanceBtnPink m-btn--square  m-btn m-btn--gradient-from-info m-btn--gradient-to-accent"
                                            type="button" onClick={this.Confirm.bind(this)}>
                                            <i class="fa fa-check Font27" aria-hidden="true"></i>&nbsp;Confirm
                                        </button>
                                    </div>
                                    <div className='col-md-6 alignLeft'>
                                        <button class="btn balanceBtnPink m-btn--square  m-btn m-btn--gradient-from-info m-btn--gradient-to-accent"
                                            type="button" onClick={this.Cancel.bind(this)}>
                                            <i class="fa fa-times Font27" aria-hidden="true"></i>&nbsp;Cancel
                                        </button>
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

export default DepositSuccess;