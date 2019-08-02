import axios from "axios";
const API = process.env.REACT_APP_API_URL;

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
   axios.defaults.baseURL = API;
};

export default setAuthToken;