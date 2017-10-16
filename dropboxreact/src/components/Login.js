import React, { Component } from 'react';
import '../styles/login.css';
import * as API from '../api/API';
import Home from './Home';
import Signup from './Signup';
import { Route} from 'react-router-dom';

class Login extends Component {
  state={
    username:'',
    password:'',
    islogged:'',
    user:'',
    message:''
  };

handleLogin = (x) => {
  console.log(x.username);
    API.checklogin(x)
        .then((output) => {
            if (output === 0) {
              this.setState({islogged: 'false', message:"Invalid credentials. Login again." });
                console.log("Wrong login: "+this.state.islogged);
            } else {
              this.setState({islogged: 'true', user: output[0]});
                console.log("Success login= "+this.state.user.firstName);
            }
        });
};

componentWillMount(){
  this.setState({username:'',password:'',islogged:'false',message:''});
}

handleLogout = () => {
      console.log('logout called');
      //this.setState({islogged: 'false'});
      API.logout()
          .then((status) => {
              if(status === 200){
                  this.setState({
                      islogged: false
                  });console.log('logout called funation---'+this.state.islogged);
                  this.componentWillMount();
              }
              else {
                console.log('logout called error');
              }
          });
  };




  render() {
    return (
      <div>

      <div className="btitle col-sm-12">
      <h1 className="ttile">Dropbox</h1>
      </div>
      <br/><br/><br/>

      {this.state.islogged==='false' ?
        (<div className="container">
<div className="row">
        <h1>SIGN IN</h1>
        <form>
        <div className="form-group row">
        <div className="col-sm-2 col-md-2 col-lg-2">Username:</div>
         <div className="col-sm-10 col-md-10 col-lg-10"><input type="text" onChange={(event)=>{
                                      this.setState({username: event.target.value});}}/></div>
        </div>

        <div className="form-group row">
        <div className="col-sm-2 col-md-2 col-lg-2">Password:</div>
        <div className="col-sm-10 col-md-10 col-lg-10"><input type="password" onChange={(event)=>{
                                      this.setState({password: event.target.value});}}/></div>
        </div>

        <div className="form-group row">
        <div className="col-sm-4 col-md-4 col-lg-4">
        <button type="button" onClick={() => this.handleLogin(this.state)}>Submit</button>
        </div>
        </div>

        <div className="form-group row">
        <div className="col-sm-4 col-md-4 col-lg-4">
        <font color="red">{this.state.message}</font>
        </div>
        </div>

        </form>  </div>
        <h1>SIGN UP</h1><Signup /></div>
      ):(<Home un={this.state.user} handleLogout={this.handleLogout} />)}


      </div>
    );
  }
}


export default Login;
