import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';

class Listall extends Component {

  state={files2:[],files:[],folders:[],bgColor1:'white',bgColor2:'yellow', newFolder:''}

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
          <h2>All Files</h2>
          {this.state.files.map(f => {
            if(f.mainFolder===1){
                 return ( <div key={Math.random()}><a href={"http://localhost:3001/download/"+(f.fileName)}>{(f.fileName).substring(14)}</a>
                          {f.starred===0 ? (<button onClick={()=> this.updateStarred(f.fileID,f.starred)} style={{backgroundColor:this.state.bgColor1}}>*</button>):
                          (<button onClick={()=> this.updateStarred(f.fileID,f.starred)} style={{backgroundColor:this.state.bgColor2}}>*</button>)}
                          </div>
                        )}
      })
     }

     <h2>All Folders</h2>
     {this.state.folders.map(f => {
     return ( <div key={f.folderName}><b>{f.folderName}</b>

       {this.state.files.map(f2 => {
         if(f2.folderID===f.folderID){
     return ( <div key={Math.random()}><a href={"http://localhost:3001/download/"+(f2.fileName)}>{(f2.fileName).substring(14)}</a>
              {f2.starred===0 ? (<button onClick={()=> this.updateStarred(f2.fileID,f2.starred)} style={{backgroundColor:this.state.bgColor1}}>*</button>):
              (<button onClick={()=> this.updateStarred(f2.fileID,f2.starred)} style={{backgroundColor:this.state.bgColor2}}>*</button>)}
              </div>
            )}
   })
  }



       </div>
            )
     })
     }
            </div>
        );
    }
}

export default withRouter(Listall);
