import React, {Component} from 'react';
import * as API from '../api/API';
import { Route, withRouter, Link } from 'react-router-dom';

class Listall extends Component {
    render() {
        return (
          <div>
          <h3>List all</h3>
         </div>
        );
    }
}

export default withRouter(Listall);
