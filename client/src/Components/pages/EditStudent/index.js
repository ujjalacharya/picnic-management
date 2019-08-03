import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import { Redirect } from "react-router-dom";
import { updateStudent, studentById } from "../../../Utils/Requests";

const EditStudent = props => {
  const [values, setValues] = useState({
    name: "",
    grade: "",
    age: "",
    roll: "",
    email: "",
    phone: "",
    address: "",
    error: "",
    success: false,
    loading: true,
    formData: ""
  });

  const {
    name,
    grade,
    age,
    roll,
    email,
    phone,
    address,
    error,
    success,
    loading,
    formData
  } = values;

  const init = async () => {
    const student = await studentById(props.match.params.id).catch(err => {
      setValues({ ...values, error: err.response.data.error });
    });
    if (student && student.status === 200) {
      setValues({
        ...values,
        formData: new FormData(),
        ...student.data,
        loading: false
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = name => event => {
    const value =
      name === "profile_pic" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, error: "", [name]: value });
  };

  const clickSubmit = async event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    const result = await updateStudent(formData, props.match.params.id).catch(
      err => {
        setValues({ ...values, error: err.response.data.error });
      }
    );
    if (result && result.status === 200) {
      console.table(result.data);
      setValues({
        ...values,
        name: "",
        grade: "",
        age: "",
        roll: "",
        email: "",
        phone: "",
        address: "",
        error: "",
        success: true,
        loading: false
      });
    }
  };

  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  const showSuccess = () => success && <Redirect to="/" />;

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Profile Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("profile_pic")}
            type="file"
            name="profile_pic"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Class</label>
        <input
          onChange={handleChange("grade")}
          type="text"
          className="form-control"
          value={grade}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Age</label>
        <input
          onChange={handleChange("age")}
          type="number"
          className="form-control"
          value={age}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Roll</label>
        <input
          onChange={handleChange("roll")}
          type="number"
          className="form-control"
          value={roll}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Phone</label>
        <input
          onChange={handleChange("phone")}
          type="number"
          className="form-control"
          value={phone}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Address</label>
        <input
          onChange={handleChange("address")}
          type="text"
          className="form-control"
          value={address}
        />
      </div>

      <button className="btn btn-outline-primary">Update Student</button>
    </form>
  );

  return (
    <Layout title="Add a new student">
      {showError()}
      {showLoading()}
      {showSuccess()}
      <div className="row">
        <div className="col-md-8 offset-md-2">{newPostForm()}</div>
      </div>
    </Layout>
  );
};

export default EditStudent;
