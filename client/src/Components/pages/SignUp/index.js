import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../core/Layout";
import Form from "./Form";
import { signUp } from "../../../Utils/Requests";

const Signup = () => {
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    birthday: "",
    gender: "",
    error: "",
    success: false
  });

  const {
    firstname,
    lastname,
    mobile,
    birthday,
    gender,
    email,
    password,
    error,
    success
  } = state;

  const handleChange = event => {
    setState({
      ...state,
      error: false,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setState({ ...state, error: false });
    const data = await signUp({
      firstname,
      lastname,
      mobile,
      birthday,
      gender,
      email,
      password
    }).catch(err => {
      setState({ ...state, error: err.response.data.error });
    });
    if (data && data.status === 200)
      setState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        mobile: "",
        birthday: "",
        gender: "",
        error: "",
        success: true
      });
  };

  const showError = () => <div className="alert alert-danger">{error}</div>;

  const showSuccess = () => (
    <div className="alert alert-info">
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <Layout title="Signup">
      {success && showSuccess()}
      {error && showError()}
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        state={state}
      />
    </Layout>
  );
};

export default Signup;
