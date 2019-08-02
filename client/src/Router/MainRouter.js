import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "../Components/pages/SiginIn";
import SignUp from "../Components/pages/SignUp";
import Home from "../Components/pages/Home";
import NewStudent from "../Components/pages/NewStudent";
import PrivateRoute from "./PrivateRoute";

const MainRouter = () => (
  <Switch>
    <PrivateRoute path="/" exact component={Home} />
    <Route path="/signin" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/new-student" exact component={NewStudent} />
  </Switch>
);

export default MainRouter;
