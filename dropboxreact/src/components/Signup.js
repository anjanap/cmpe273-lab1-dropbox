import React, {Component} from 'react';
import * as API from '../api/API';
import { Route} from 'react-router-dom';

class Home extends Component {
  state={
    fname:'',
    lname:'',
    email:'',
    password:''
  };

  handleSubmit = (user) => {
      API.signup(user)
          .then((output) => {
              if (output === 0) {
                  console.log("Failed signup");
              } else {
                  console.log("Success signup");
              }
          });
  };


    render() {
        return (
          <form>
          First Name: <input type="text" id="fname" name="fname" onChange={(event)=>{
                                        this.setState({fname: event.target.value});}} /><br/>
          Last Name: <input type="text" id="lname" name="lname" onChange={(event)=>{
                                        this.setState({lname: event.target.value});}} /><br/>
          Email: <input type="text" id="email" name="email" onChange={(event)=>{
                                        this.setState({email: event.target.value});}} /><br/>
          Password: <input type="password" id="pswd" name="pswd" onChange={(event)=>{
                                        this.setState({password: event.target.value});}} /><br/>
          <button type="button" onClick={() => this.handleSubmit(this.state)}>Submit</button>
          </form>
        );
    }
}

export default Home;
