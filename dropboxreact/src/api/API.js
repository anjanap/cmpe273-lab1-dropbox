const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const signup = (payload) =>
    fetch(`${api}/signup/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res => {
        return res.output;
    })
        .catch(error => {
            console.log("This is signup error");
            return error;
        });

export const checklogin = (payload) =>
    fetch(`${api}/login/checklogin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res => {
        return res.output;
    })
        .catch(error => {
            console.log("This is login error");
            return error;
        });

export const logout = () =>
    fetch(`${api}/login/logout`, {
      method: 'POST',
      headers: {
          ...headers,
          'Content-Type': 'application/json'
      },
            }).then(res => {
                return res.status;
            }).catch(error => {
                    console.log("This is error");
                    return error;
                });

export const add = (payload) =>
            fetch(`${api}/addfile/add`, {
                method: 'POST',
                body: payload
            }).then(res=>res.json())
            .then(res => {
                return res.output;
            })
                .catch(error => {
                    console.log("This is file upload error");
                    return error;
                });

export const addfolder = (payload) =>
      fetch(`${api}/listall/addfolder`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res=>res.json())
      .then(res => {
        return res.output;
      })
      .catch(error => {
        console.log("This is new folder error");
          return error;
        });


export const list = (payload) =>
              fetch(`${api}/listall/list`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(res=>res.json())
            .then(res => {
              return res.data;
            })
            .catch(error => {
              console.log("This is list error");
              return error;
            });

export const folderContent = (payload) =>
              fetch(`${api}/listall/folderContent`, {
                method: 'POST',
                headers: {
                  ...headers,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              }).then(res=>res.json())
              .then(res => {
                return res.data;
               })
               .catch(error => {
                 console.log("This is list error");
                 return error;
                 });

export const listfolder = (payload) =>
              fetch(`${api}/listall/listfolder`, {
                method: 'POST',
                headers: {
                  ...headers,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              }).then(res=>res.json())
              .then(res => {
                return res.data;
              })
              .catch(error => {
                console.log("This is list error");
                return error;
              });

export const starred = (payload) =>
              fetch(`${api}/listall/starred`, {
                method: 'POST',
                headers: {
                  ...headers,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              }).then(res=>res.json())
              .then(res => {
                return res.data;
              })
              .catch(error => {
                console.log("This is starred error");
                return error;
              });

export const starupdate = (payload) =>
              fetch(`${api}/listall/starupdate`, {
                method: 'POST',
                headers: {
                  ...headers,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              }).then(res=>res.json())
              .then(res => {
                return res.data;
              })
              .catch(error => {
                console.log("This is update star error");
                return error;
              });

export const activity = (payload) =>
fetch(`${api}/activityrep/activityrep`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
}).then(res=>res.json())
.then(res => {
    return res.data;
  })
  .catch(error => {
    console.log("This is Activity Report error");
    return error;
  });


  export const addtofolder = (payload) =>
              fetch(`${api}/addfile/folderfile`, {
                  method: 'POST',
                  body: payload
              }).then(res=>res.json())
              .then(res => {
                  return res.output;
              })
                  .catch(error => {
                      console.log("This is file upload error");
                      return error;
                  });
