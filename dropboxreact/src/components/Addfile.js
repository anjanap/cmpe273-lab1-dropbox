import React, {Component} from 'react';
import * as API from '../api/API';
import { Route, withRouter, Link } from 'react-router-dom';

class Addfile extends Component {
  state={
    filenew:'',
    folders:[],
    fid:''
  };

  componentWillMount(){
    var x={uid:this.props.data.userID};
          API.listfolder(x)
              .then((data) => {
                  if (data.length > 0) {
                    this.setState({folders: data});
                      console.log("Folders listed: "+ this.state.folders[1]);
                  } else {
                      console.log("Folders not listed");
                  }
              });
  }

handleUpload = (event) => {
  console.log("Addfile data: "+this.props.data.firstName+this.props.data.lastName);
  const payload=new FormData();
  payload.append('myfile', event.target.files[0]);
  payload.append('uid', this.props.data.userID);
  //console.log(x);
    API.add(payload)
        .then((upl) => {
            if (upl === 1) {
              //this.setState({islogged: 'false' });
                console.log("File uploaded" );
            } else {
              //this.setState({islogged: 'true' });
                console.log("File not uploaded");
                //this.context.history.push("/home");
            }
        });
};

folderFile = (event) => {
  console.log("FOLDERID: "+this.state.fid);
};

    render() {
        return (
          <div>
          <h3>Add file</h3>
          <input id="newfile" type="file" name="newfile" onChange={this.handleUpload}/>


          <h2>Add Files to Folders</h2>
          {this.state.folders.map(f => {
          return ( <div key={f.folderName}>{f.folderName}
            <input id="newfile" type="file" name="newfile" onChange={this.folderFile()}/></div>
                 )
          })
          }


         </div>
        );
    }
}

export default withRouter(Addfile);
