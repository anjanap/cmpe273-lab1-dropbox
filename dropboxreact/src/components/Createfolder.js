import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';

class Createfolder extends Component {

  state={folderstatus:'', newFolder:''}

  componentWillMount(){
    this.setState({folderstatus:''});
  }

  handleNewfolder = (f) => {
    console.log(f.newFolder);
    var x={uid:this.props.data.userID, newf:f.newFolder};
      API.addfolder(x)
          .then((output) => {
              if (output === 1) {
                  console.log("Folder created");
                  this.setState({folderstatus:'Folder created'});
              } else {
                  console.log("Folder not created");
                  this.setState({folderstatus:'Folder not created'});
              }
          });
  };

    render() {
        return (
          <div>
          <p>Create new folder</p>
          <form>
          Folder Name: <input type="text" id="newfolder" onChange={(event)=>{
                                   this.setState({newFolder: event.target.value});}}/><br/>
          <button type="button" onClick={() => this.handleNewfolder(this.state)}>Submit</button>
          </form>
          <font color="red">{this.state.folderstatus}</font>
          </div>
        );
    }
}

export default withRouter(Createfolder);
