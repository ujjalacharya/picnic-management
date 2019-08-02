import React, {Component} from 'react';
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./Router/MainRouter";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    );
  }
}

export default App;
