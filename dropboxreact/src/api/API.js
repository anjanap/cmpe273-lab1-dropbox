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
      console.log("This signup: "+res.output);
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
      //console.log("This is: "+res.output);
        return res.output;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
