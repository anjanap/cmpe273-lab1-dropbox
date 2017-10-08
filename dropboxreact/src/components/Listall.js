import React, {Component} from 'react';
import * as API from '../api/API';
import { Route, withRouter, Link } from 'react-router-dom';

class Listall extends Component {

  state={files:[],bgColor1:'white',bgColor2:'yellow'}

  componentWillMount(){
    var x={uid:this.props.data.userID};
    console.log(x.uid);
      API.list(x)
          .then((data) => {
              if (data.length > 0) {
                this.setState({files: data});
                  console.log("File listed"+ this.state.files[1]);
              } else {
                  console.log("File not listed");
              }
          });
  }

  updateStarred = (i,s) => {
    var x={fid:i,st:s};
    console.log("File: "+x.fid);
      API.starupdate(x)
          .then((output) => {
              if (output === 0) {
                  console.log("Star updated");
              } else {
                  console.log("Star not updated");
              }
          });
  };

    render() {
        return (
          <div>
          <h3>All Files</h3>
          {this.state.files.map(f => {
        return ( <div key={f.fileName}>
                 {f.fileName}{f.starred===0 ? (<button onClick={()=> this.updateStarred(f.fileID,f.starred)} style={{backgroundColor:this.state.bgColor1}}>*</button>):
                 (<button onClick={()=> this.updateStarred(f.fileID,f.starred)} style={{backgroundColor:this.state.bgColor2}}>*</button>)}
                 </div>
                 )
      })
     }

     <h3>Create new folder</h3>
     <form>
     Folder Name: <input type="text" id="newfolder"/><br/>
     <button type="button">Submit</button>
     </form>
            </div>
        );
    }
}

export default withRouter(Listall);
