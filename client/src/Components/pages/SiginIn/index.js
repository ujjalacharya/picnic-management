import React, { useState } from "react";
import Layout from "../../core/Layout";
import Form from "./Form";
import { Redirect } from "react-router-dom";

const SignIn = () => {
  const [state, setState] = useState({
    email: "acharyaujjal1@gmail.com",
    password: "123456",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = state;

  const handleChange = event => {
    setState({
      ...state,
      error: false,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(state);
  };

  const showError = () => <div className="alert alert-danger">{error}</div>;

  const showLoading = () => (
    <div className="alert alert-info">
      <h2>Loading...</h2>
    </div>
  );

  const redirectUser = () => <Redirect to="/" />;

  return (
    <Layout title="SignIn">
      {loading && showLoading()}
      {error && showError()}
      {!loading && (
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          state={state}
        />
      )}
      {redirectToReferrer && redirectUser()}
    </Layout>
  );
};

export default SignIn;
