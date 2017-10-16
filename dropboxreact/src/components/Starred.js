import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';

class Starred extends Component {

  state={sfiles:[]}

  componentWillMount(){
    var x={uid:this.props.data.userID};
    console.log(x.uid);
      API.starred(x)
          .then((data) => {
              if (data.length > 0) {
                for(var z=0;z<data.length;z++)
                {
                  var newArray = this.state.sfiles.slice();
                  newArray.push((data[z].fileName).substring(14));
                  this.setState({sfiles:newArray})
                }
              } else {
                  console.log("File not listed");
              }
          });
  }

    render() {
        return (
          <div>
          <h3>Starred Files</h3>
          {this.state.sfiles.map(f => {
        return ( <div key={Math.random()}>
                 {f}
                 </div>
                 )
      })
     }
     </div>
        );
    }
}

export default withRouter(Starred);
