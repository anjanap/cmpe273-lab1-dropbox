import React, {Component} from 'react';
import * as API from '../api/API';
import { Route} from 'react-router-dom';
import ReactDOM from 'react-dom';

class Home extends Component {
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
          <div>
          <form>
          First Name: <input type="text" ref="fn" id="fname" onChange={(event)=>{
                                        this.setState({fname: event.target.value});}} /><br/>
          Last Name: <input type="text" ref="ln" id="lname" onChange={(event)=>{
                                        this.setState({lname: event.target.value});}} /><br/>
          Email: <input type="text" ref="em" id="email" onChange={(event)=>{
                                        this.setState({email: event.target.value});}} /><br/>
          Password: <input type="password" ref="pwd" id="pswd" onChange={(event)=>{
                                        this.setState({password: event.target.value});}} /><br/>
          <button type="button" onClick={() => this.handleSubmit(this.state)}>Submit</button>
          </form>
          <font color="red">{this.state.status}</font>
          </div>
        );
    }
}

export default Home;
