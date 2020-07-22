import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import axios from "axios";

import { BrowserRouter as Link } from "react-router-dom";


export default class Login extends Component {
    state = {

        username: '',
        password: '',
        errorMessage: ''

        };

    
    handleChangeusername = event =>{
        this.setState({username: event.target.value})
    }

    handleChangePassword = event =>{
        this.setState({password: event.target.value})
    }

    handleClick = (event) => {
        event.preventDefault();

        const username = this.state.username;
        const password = this.state.password;
        const data = "username="+username+"&password="+password
        axios.post(`http://localhost:3001/auth/login`, data,{headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }})
        .then(res=>{
        if(res.status == "200"){
        this.props.history.push("login");}
        else{
            console.log('dasdasfasdfa')
        }
        }).catch(err=>{
            console.log(err.response.data)
            this.setState({errorMessage: err.response.data.msg })
        })
    }
    render() {
        return (
                <div className="bcksigup">

    <div className="App"  >
      <nav className="navbar navbar-expand-lg navbar-light fixed-top  background-color: coral">
        <div >
          <Link className="navbar-brand" to={"/login"}>Login </Link>
          <Link className="navbar-brand" to={"/register"}> Register</Link>
        </div>
      </nav>
      <div className="auth-wrapper">
        <div className="auth-inner">
           <form>
                <h3>Login</h3>

                { this.state.errorMessage &&
                <h3 className="error"> { this.state.errorMessage } </h3> }

                <div className="form-group">
                    <label>Username</label>
                    <input type="username" className="form-control" placeholder="Enter username" onChange={this.handleChangeusername}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.handleChangePassword}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button onClick={this.handleClick} type="submit"  className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                <a href="#"> Forgot password?</a>
                </p>
            </form>
            </div>
            </div>
            </div>
            </div>
        );
    }
}