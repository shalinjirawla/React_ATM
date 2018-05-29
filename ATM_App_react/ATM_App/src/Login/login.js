import React, { Component } from 'react';
import "./login.css";
import logo from '../logo.svg';
import SweetAlert from 'sweetalert-react';
// import SweetAlert from 'react-bootstrap-sweetalert';
import 'sweetalert/dist/sweetalert.css';

window.SweetAlert = SweetAlert;
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wrongP: false,
            email: "",
            emailHelp: "",
            password: "",
            passwordHelp: "",
            Regfullname: "",
            RegfullnameHelp: "",
            Regemali: "",
            RegemaliHelp: "",
            Regpassword: "",
            RegpasswordHelp: "",
            Regconfirmpassword: "",
            RegconfirmpasswordHelp: "",
            show: false,
            alert: null
        };
    }

    componentWillMount() {
        document.documentElement.style.overflow = 'hidden';
        var data = localStorage.getItem('userData');
        if (data != null) {
            this.props.history.push('/home');
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    displaySignUpForm() {
        let login = document.getElementById('m_login');
        login.classList.remove('m-login--forget-password');
        login.classList.remove('m-login--signin');
        login.classList.add('m-login--signup');
    }
    displaySignInForm() {
        let login = document.getElementById('m_login');
        login.classList.remove('m-login--forget-password');
        login.classList.remove('m-login--signup');
        login.classList.add('m-login--signin');
    }
    closeWrongP() {
        this.setState({ wrongP: false });
    }
    handleSubmit = event => {
        if (this.state.email == null || this.state.email == "") {
            this.setState({ emailHelp: "Username is required." });
            return;
        }
        else {
            this.setState({ emailHelp: "" });
        }
        if (this.state.password == null || this.state.password == "") {
            this.setState({ passwordHelp: "Password is required." });
            return;
        }
        else {
            this.setState({ passwordHelp: "" });
        }
        console.log(JSON.stringify(this.state));
        event.preventDefault();
        var data = require('../Data/Users.json'); // forward slashes will depend on the file location
        var accData = require('../Data/Account.json');
        var k = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].username.toLowerCase() == this.state.email.toLowerCase() && data[i].password == this.state.password) {
                for (var j = 0; j < accData.length; j++) {
                    if (accData[i].id == data[i].id) {
                        localStorage.setItem("accData", JSON.stringify(accData[i]));
                    }
                }
                localStorage.setItem("userData", JSON.stringify(data[i]));
                this.props.history.push('/home');
            }
            else {
                k++;
            }
        }
        if (k == data.length) {
            this.setState({ wrongP: true });
        }
    }
    hideAlert() {
        this.setState({
            alert: null
        });
    }

    saveUserData = event => {
        if (this.state.Regfullname == null || this.state.Regfullname == "") {
            this.setState({ RegfullnameHelp: "Fullname is required." });
            return;
        }
        else {
            this.setState({ RegfullnameHelp: "" });
        }
        if (this.state.Regemali == null || this.state.Regemali == "") {
            this.setState({ RegemaliHelp: "Email is required." });
            return;
        }
        else {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(this.state.Regemali) == false) {
                this.setState({ RegemaliHelp: "Please enter valid email." });
                return;
            }
            this.setState({ RegemaliHelp: "" });
        }
        if (this.state.Regpassword == null || this.state.Regpassword == "") {
            this.setState({ RegpasswordHelp: "Password is required." });
            return;
        }
        else {
            this.setState({ RegpasswordHelp: "" });
        }
        if (this.state.Regconfirmpassword == null || this.state.Regconfirmpassword == "") {
            this.setState({ RegconfirmpasswordHelp: "Confirm password is required." });
            return;
        }
        else {
            if (this.state.Regpassword != this.state.Regconfirmpassword) {
                this.setState({ RegconfirmpasswordHelp: "Your password and confirmation password do not match." });
                return;
            }
            else {
                this.setState({ RegconfirmpasswordHelp: "" });
            }
        }
        var fullname = this.state.Regfullname;
        var email = this.state.Regemali;
        var password = this.state.Regpassword;
        console.log(
            {
                UserData: {
                    fullname: fullname,
                    email: email,
                    password: password
                }
            }
        );
        this.setState({ show: true });
        // this.setState({
        //     alert: (
        //         <SweetAlert
        //             custom
        //             showCancel
        //             confirmBtnText="Yes"
        //             cancelBtnText="No"
        //             confirmBtnBsStyle="primary"
        //             cancelBtnBsStyle="default"
        //             customIcon="thumbs-up.jpg"
        //             title="Do you like thumbs?"
        //             onConfirm={this.hideAlert}
        //             onCancel={this.hideAlert}
        //         >
        //             You will find they are up!
        //         </SweetAlert>
        //     )
        // });
        console.log(this.state);
        // document.getElementById('m_login_signup_submit')
        //     .click(function(e){swal("Good job!","You clicked the button!","success")})
        // var fs = require('file-system');
        // var jsonfile = require('jsonfile')
        // var file = '../Data/Users.json'
        // var file1 = require('../Data/Users.json');
        // var data = {};

        // fs.writeFile("../Data/Users.json", JSON.stringify(data), function (err) {
        //     if (err) {
        //         return console.log(err);
        //     } else {
        //         console.log("Mock data generated.");
        //     }
        // });
        // jsonfile.writeFileSync(file, data)
        // jsonfile.writeFile(file1, data, function (err) {
        //     console.log(err)
        // })
        // jsonfile.readFile(file, function (err, obj) {
        //     console.dir(obj)
        // })
    }

    render() {
        const font15 = {
            fontSize: '15px'
        }
        const height21 = {
            height: '20rem'
        }
        const margin10 = {
            margin: '10px 0 2rem 0'
        }
        const marginT3 = {
            marginTop: '3rem'
        }

        return (
            <div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-grid--tablet-and-mobile m-grid--hor-tablet-and-mobile m-login m-login--1 m-login--signin"
                id="m_login">
                <SweetAlert
                    show={this.state.show}
                    title="Success!"
                    text="Data saved successfully!"
                    onConfirm={() => this.setState({ show: false })}
                />

                {/* <SweetAlert title="Here's a message!" onConfirm={() => this.setState({ show: false })} /> */}
                <div class="m-grid__item m-grid__item--order-tablet-and-mobile-2 m-login__aside">
                    <div class="m-stack m-stack--hor m-stack--desktop">
                        <div class="m-stack__item m-stack__item--fluid">
                            <div class="m-login__wrapper">
                                <div class="m-login__logo">
                                    <a href="#">
                                        <img src={logo} className="App-logo" alt="logo" style={height21} />
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
                                            <g fill="#61DAFB">
                                                <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" />
                                                <circle cx="420.9" cy="296.5" r="45.7" />
                                                <path d="M520.5 78.1z" />
                                            </g>
                                        </svg> */}
                                    </a>
                                </div>
                                <div class="m-login__signin">
                                    <div class="m-login__head">
                                        <h3 class="m-login__title">
                                            Sign In
                                    </h3>

                                    </div>
                                    <div className={this.state.wrongP ? '' : 'hidden'}>
                                        <div role="alert" class="m-alert m-alert--outline alert alert-danger alert-dismissible">
                                            <i class="fa fa-times loginBtn" aria-hidden="true" onClick={this.closeWrongP.bind(this)}></i>
                                            <span>Error: Email or password is incorrect</span>
                                        </div>
                                    </div>
                                    <div class="m-login__form m-form">

                                        <div class="form-group m-form__group">
                                            <input class="form-control m-input" type="text" placeholder="Username" autocomplete="off" value={this.state.email} id="email" onChange={this.handleChange.bind(this)} style={font15} />
                                            <div class="form-control-feedback colorR">{this.state.emailHelp}</div>
                                        </div>
                                        <div class="form-group m-form__group">
                                            <input class="form-control m-input m-login__form-input--last" type="password" placeholder="Password" value={this.state.password} id="password" onChange={this.handleChange.bind(this)} style={font15} />
                                            <div class="form-control-feedback colorR">{this.state.passwordHelp}</div>
                                        </div>
                                        <div class="row m-login__form-sub">
                                            <div class="col m--align-left">
                                                <label class="m-checkbox m-checkbox--focus" style={font15}>
                                                    <input type="checkbox" name="remember" /> Remember me
                                                <span></span>
                                                </label>
                                            </div>
                                            <div class="col m--align-right">
                                                <a href="javascript:;" id="m_login_forget_password" class="m-link" style={font15}>
                                                    Forget Password ?
                                                </a>
                                            </div>
                                        </div>
                                        <div class="m-login__form-action">
                                            <button id="m_login_signin_submit"
                                                class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air" onClick={this.handleSubmit.bind(this)}>
                                                Sign In
                                        </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="m-login__signup">
                                    <div class="m-login__head">
                                        <h3 class="m-login__title">
                                            Sign Up
                                        </h3>
                                        <div class="m-login__desc" style={font15}>
                                            Enter your details to create your account:
                                        </div>
                                    </div>
                                    <div class="m-login__form m-form" action="" style={marginT3}>
                                        <div class="form-group m-form__group">
                                            <input style={font15} class="form-control m-input" type="text" placeholder="Fullname" name="fullname" id="Regfullname" onChange={this.handleChange.bind(this)} />
                                            <div class="form-control-feedback colorR">{this.state.RegfullnameHelp}</div>
                                        </div>
                                        <div class="form-group m-form__group">
                                            <input style={font15} class="form-control m-input" type="text" placeholder="Email" name="email" id='Regemali' onChange={this.handleChange.bind(this)} />
                                            <div class="form-control-feedback colorR">{this.state.RegemaliHelp}</div>
                                        </div>
                                        <div class="form-group m-form__group">
                                            <input style={font15} class="form-control m-input" type="password" placeholder="Password" name="password" id="Regpassword" onChange={this.handleChange.bind(this)} />
                                            <div class="form-control-feedback colorR">{this.state.RegpasswordHelp}</div>
                                        </div>
                                        <div class="form-group m-form__group">
                                            <input style={font15} class="form-control m-input m-login__form-input--last" type="password"
                                                placeholder="Confirm Password" name="rpassword" id='Regconfirmpassword' onChange={this.handleChange.bind(this)} />
                                            <div class="form-control-feedback colorR">{this.state.RegconfirmpasswordHelp}</div>
                                        </div>
                                        <div class="row form-group m-form__group m-login__form-sub">
                                            <div class="col m--align-left">
                                                <label class="m-checkbox m-checkbox--focus" style={font15}>
                                                    <input type="checkbox" name="agree" />
                                                    I Agree the &nbsp;&nbsp;
										<a href="#" class="m-link m-link--focus" style={font15}>
                                                        terms and conditions
										</a>
                                                    .
										<span></span>
                                                </label>
                                                <span class="m-form__help"></span>
                                            </div>
                                        </div>
                                        <div class="m-login__form-action" style={margin10}>
                                            <button id="m_login_signup_submit" class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air"
                                                onClick={this.saveUserData.bind(this)}>
                                                Sign Up
								</button>
                                            <button id="m_login_signup_cancel" class="btn btn-outline-focus  m-btn m-btn--pill m-btn--custom"
                                                onClick={this.displaySignInForm.bind(this)}>
                                                Cancel
								</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-stack__item m-stack__item--center">
                            <div class="m-login__account">
                                <span class="m-login__account-msg">
                                    Don't have an account yet ?
					</span>
                                &nbsp;&nbsp;
					<a class="m-link m-link--focus m-login__account-link" href="javascript:;" id="m_login_signup"
                                    onClick={this.displaySignUpForm.bind(this)}
                                >
                                    Sign Up
					</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-grid__item m-grid__item--fluid m-grid m-grid--center m-grid--hor m-grid__item--order-tablet-and-mobile-1	m-login__content backGround">
                    <div class="m-grid__item m-grid__item--middle">
                        <h3 class="m-login__welcome">
                            Join Our Community
                    </h3>
                        <p class="m-login__msg">
                            Lorem ipsum dolor sit amet, coectetuer adipiscing
                        <br /> elit sed diam nonummy et nibh euismod
                    </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
