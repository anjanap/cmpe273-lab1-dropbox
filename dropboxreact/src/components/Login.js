import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

handleLogout = () => {
      console.log('logout called');
      this.props.history.push("/");
      API.logout()
          .then((status) => {
              if(status === 200){
                  this.setState({
                      islogged: false
                  });
              }
          });
  };

  componentWillMount(){
    this.setState({username:'',password:'',islogged:'false',message:''});
  }


  render() {
    return (
      <div className="container">
      <h1>Dropbox</h1>
      {this.state.islogged==='false' ?
        (<div>
        <h1>SIGN IN</h1>
        <form>
        Username: <input type="text" onChange={(event)=>{
                                      this.setState({username: event.target.value});}}/><br/>
        Password: <input type="password" onChange={(event)=>{
                                      this.setState({password: event.target.value});}}/><br/>
        <button type="button" onClick={() => this.handleLogin(this.state)}>Submit</button><br/>
        <font color="red">{this.state.message}</font>
        </form>
        <h1>SIGN UP</h1><Signup /></div>
      ):(<Home un={this.state.user} handleLogout={this.handleLogout} />)}

      </div>
    );
  }
}


export default Login;
