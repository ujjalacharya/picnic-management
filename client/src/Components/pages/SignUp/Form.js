import React from "react";

const Form = ({ handleChange, handleSubmit, state }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">First Name</label>
        <input
          onChange={handleChange}
          name="firstname"
          type="text"
          className="form-control"
          value={state.firstname}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Last Name</label>
        <input
          onChange={handleChange}
          name="lastname"
          type="text"
          className="form-control"
          value={state.lastname}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          className="form-control"
          value={state.email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control"
          value={state.password}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Mobile</label>
        <input
          onChange={handleChange}
          name="mobile"
          type="number"
          className="form-control"
          value={state.mobile}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Date of Birth</label>
        <input
          onChange={handleChange}
          name="birthday"
          type="date"
          className="form-control"
          value={state.birthday}
        />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select className="custom-select" name="gender" required onChange={handleChange}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default Form;
