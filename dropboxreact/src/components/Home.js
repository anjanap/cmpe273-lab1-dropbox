import React, {Component} from 'react';
import * as API from '../api/API';
import { Route, Link } from 'react-router-dom';
import Listall from './Listall';
class Home extends Component {

    render() {
        return (
          <div>
          <h3>Welcome {this.props.un}</h3>
          <Link to='/listall'>List</Link>


          <Route path="/home" component={Home}/>
          <Route path="/listall" component={Listall}/>
         </div>
        );
    }
}

export default Home;
