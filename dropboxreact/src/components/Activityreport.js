import React, {Component} from 'react';
import * as API from '../api/API';
import { Route, withRouter, Link } from 'react-router-dom';

class Activityreport extends Component {
  state={actv:[]}

    componentWillMount(){
      var x={uid:this.props.data.userID};
      console.log(x.uid);
        API.activity(x)
            .then((data) => {
                if (data.length > 0) {
                  for(var z=0;z<data.length;z++)
                  {
                    var newArray = this.state.actv.slice();
                    newArray.push(data[z].status);
                    this.setState({actv:newArray})
                  }
                } else {
                    console.log("File not listed");
                }
            });
    }

      render() {
          return (
            <div>
            <h3>Activity Report</h3>
            {this.state.actv.map(act => {
          return ( <div key={act}>
                   {act}
                   </div>
                   )
        })
       }
              </div>
          );
      }
}

export default withRouter(Activityreport);
