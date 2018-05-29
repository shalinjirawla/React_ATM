import React, { Component } from 'react';

class LogoutComponent extends Component {
    componentwillmount(){
        this.Logout();
    }
    Logout(){
        localStorage.removeItem("userData");
        this.props.history.push('/login');
        // window.location.href = "/login";
    }
}

export default LogoutComponent;