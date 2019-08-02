import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./Router/MainRouter";
import setAuthToken from "./Utils/setAuthToken";
import { isAuthenticated } from "./Utils/Requests";

class App extends Component {
  componentDidMount() {
    setAuthToken(isAuthenticated().token);
  }

  render() {
    return (
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    );
  }
}

export default App;
