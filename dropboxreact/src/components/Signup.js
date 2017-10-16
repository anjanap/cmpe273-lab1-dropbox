import React, {Component} from 'react';
import * as API from '../api/API';
//import { Route} from 'react-router-dom';
import ReactDOM from 'react-dom';

class Signup extends Component {
  state={
    fname:'',
    lname:'',
    email:'',
    password:'',
    status:''
  };

  componentWillMount(){
    this.setState({status:''});
  }

  handleSubmit = (user) => {
      API.signup(user)
          .then((output) => {
              if (output === 0) {
                  console.log("Failed signup");
                  this.setState({status: "Sign up failed."});
              } else {
                  console.log("Success signup");
                  ReactDOM.findDOMNode(this.refs.fn).value = "";
                  ReactDOM.findDOMNode(this.refs.ln).value = "";
                  ReactDOM.findDOMNode(this.refs.em).value = "";
                  ReactDOM.findDOMNode(this.refs.pwd).value = "";
                  this.setState({status: "Sign up successful."});
              }
          });
  };


    render() {
        return (
          <div className="container">

          <div className="row">
          <form>
          <div className="form-group row">
          <div className="col-sm-2 col-md-2 col-lg-2">First Name:</div>
           <div className="col-sm-10 col-md-10 col-lg-10">
           <input type="text" ref="fn" id="fname" onChange={(event)=>{
                                        this.setState({fname: event.target.value});}} /></div>
          </div>

          <div className="form-group row">
          <div className="col-sm-2 col-md-2 col-lg-2">Last Name:</div>
           <div className="col-sm-10 col-md-10 col-lg-10">
           <input type="text" ref="ln" id="lname" onChange={(event)=>{
                                        this.setState({lname: event.target.value});}} /></div>
          </div>

          <div className="form-group row">
          <div className="col-sm-2 col-md-2 col-lg-2">Email:</div>
           <div className="col-sm-10 col-md-10 col-lg-10">
           <input type="text" ref="em" id="email" onChange={(event)=>{
                                        this.setState({email: event.target.value});}} /></div>
          </div>

          <div className="form-group row">
          <div className="col-sm-2 col-md-2 col-lg-2">Password:</div>
           <div className="col-sm-10 col-md-10 col-lg-10">
           <input type="password" ref="pwd" id="pswd" onChange={(event)=>{
                                        this.setState({password: event.target.value});}} /></div>
          </div>

          <div className="form-group row">
          <div className="col-sm-4 col-md-4 col-lg-4">
          <button type="button" onClick={() => this.handleSubmit(this.state)}>Submit</button>
          </div>
          </div>

          <div className="form-group row">
          <div className="col-sm-4 col-md-4 col-lg-4">
          <font color="red">{this.state.status}</font>
          </div>
          </div>

          </form>
          </div>

          </div>
        );
    }
}

export default Signup;
