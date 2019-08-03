import axios from "axios";
let API = 'http://localhost:8000/api';

if (process.env.NODE_ENV === "production") {
  API = 'https://picnic-mgt.herokuapp.com/api';
}

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
   axios.defaults.baseURL = API;
};

export default setAuthToken;