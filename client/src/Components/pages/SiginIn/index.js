import React, { useState } from "react";
import Layout from "../../core/Layout";
import Form from "./Form";
import { Redirect } from "react-router-dom";
import { signIn, authenticate } from "../../../Utils/Requests";

const SignIn = () => {
  const [state, setState] = useState({
    email: "admin@ujjalacharya.com.np",
    password: "123456789",
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
    setState({ ...state, error: false, loading: true });
    const data = await signIn({ email, password }).catch(err => {
      setState({ ...state, error: err.response.data.error });
    });
    if (data && data.status === 200) {
      authenticate(data, () => {
        setState({
          ...state,
          redirectToReferrer: true
        });
      });
    }
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
