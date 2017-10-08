import React, {Component} from 'react';
import * as API from '../api/API';
import { Route, Link,Switch } from 'react-router-dom';
import Listall from './Listall';
import Addfile from './Addfile';
import Login from './Addfile';
class Home extends Component {

    render() {
      //console.log(this.props);
        return (
          <div>
          <h3>Welcome {this.props.un.firstName}{this.props.un.lastName}</h3>
<Link to='/'></Link>
          <Link to='/listall'>List All</Link>
          <Link to='/addfile'>Add File</Link>
          <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/listall" component={Listall}/>
          <Route path="/addfile" component={() => <Addfile data={this.props.un}/>}/>
</Switch>
         </div>
        );
    }
}

export default Home;
