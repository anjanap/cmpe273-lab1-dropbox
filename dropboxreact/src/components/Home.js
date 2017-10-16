import React, {Component} from 'react';
import * as API from '../api/API';
import { Route, Link,Switch } from 'react-router-dom';
import Listall from './Listall';
import Addfile from './Addfile';
import Login from './Addfile';
import Starred from './Starred';
import Activityreport from './Activityreport';
import Createfolder from './Createfolder';
class Home extends Component {
//<div className="col-sm-1 col-md-1 col-lg-1"> <Link to='/activityrep'>Logout</Link></div>
    render() {
        return (
          <div className="container">
          <br/>

          <div className="row">
          <div className="col-sm-2 col-md-2 col-lg-2"><h5>Welcome {this.props.un.firstName} {this.props.un.lastName}</h5></div>
          <div className="col-sm-1 col-md-1 col-lg-1"> <Link to='/'></Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1">  <Link to='/listall'>List All</Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/addfile'>Upload File</Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/createfolder'>Create Folder</Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1">  <Link to='/starred'>Starred File</Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/activityrep'>Activity Report</Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1"><button onClick={() => this.props.handleLogout()}>Logout</button></div>
          </div>

          <Switch>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/listall" component={() => <Listall data={this.props.un}/>}/>
          <Route exact path="/addfile" component={() => <Addfile data={this.props.un}/>}/>
          <Route exact path="/createfolder" component={() => <Createfolder data={this.props.un}/>}/>
          <Route exact path="/starred" component={() => <Starred data={this.props.un}/>}/>
          <Route exact path="/activityrep" component={() => <Activityreport data={this.props.un}/>}/>
          </Switch>

         </div>
        );
    }
}

export default Home;
