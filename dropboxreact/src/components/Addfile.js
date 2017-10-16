import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';

class Addfile extends Component {
  state={
    filenew:'',
    folders:[],
    fid:'',
    uploadstatus:'',
    currName:''
  };

  componentWillMount(){
    this.setState({uploadstatus: ''});
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
  const payload=new FormData();
  payload.append('myfile', event.target.files[0]);
  payload.append('uid', this.props.data.userID);
    API.add(payload)
        .then((output) => {
            if (output === 1) {
              this.setState({uploadstatus: 'File uploaded.'});
                console.log("File uploaded" );
            } else {
              this.setState({uploadstatus: 'File not uploaded.'});
                console.log("File not uploaded");
            }
        });
};


handleUpload2 = (fln,fdn) => {
  const payload=new FormData();
  payload.append('myfile', fln);
  payload.append('uid', this.props.data.userID);
  payload.append('foldID', fdn);
  console.log("Upload folder ID: ",fdn);
   API.addtofolder(payload)
        .then((output) => {
            if (output === 1) {
              this.setState({uploadstatus: 'File uploaded.'});
                console.log("File uploaded" );
            } else {
              this.setState({uploadstatus: 'File not uploaded.'});
                console.log("File not uploaded");
            }
        });
};

setFolderVal = (na) => {
  this.setState({currName:na});
  console.log("FOLDER NAME: "+ this.state.currName);
};

    render() {
        return (
          <div>
          <font color="red">{this.state.uploadstatus}</font>
          <h3>Add file</h3>
          <input id="newfile" type="file" name="newfile" onChange={this.handleUpload}/>
          <h3>Add Files to Folders</h3>
          {this.state.folders.map(f => {
          return ( <div key={f.folderName} ref="fold">{f.folderName}
            <input id="newfile" type="file" name="newfile" onChange={(event)=>{this.handleUpload2(event.target.files[0],f.folderID);}} /></div>
                 )
          })
          }
         </div>
        );
    }
}

export default withRouter(Addfile);
