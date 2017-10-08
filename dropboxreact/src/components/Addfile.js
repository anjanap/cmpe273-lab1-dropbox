import React, {Component} from 'react';
import * as API from '../api/API';
import { Route, withRouter, Link } from 'react-router-dom';

class Addfile extends Component {
  state={
    filenew:''
  };

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
/*  constructor(props){
  super(props);
  this.state={
             filesToBeSent:[],
    }
}
onDrop(acceptedFiles, rejectedFiles) {
    // console.log('Accepted files: ', acceptedFiles[0].name);
    var filesToBeSent=this.state.filesToBeSent;
    filesToBeSent.push(acceptedFiles);
    this.setState({filesToBeSent});
}
<Dropzone onDrop={(files) => this.onDrop(files)}>
      <div>Try dropping some files here, or click to select files to upload.</div>
</Dropzone>*/
    render() {
        return (
          <div>
          <h3>Add file</h3>
          <input id="newfile" type="file" name="newfile" onChange={this.handleUpload}/>
         </div>
        );
    }
}

export default withRouter(Addfile);
