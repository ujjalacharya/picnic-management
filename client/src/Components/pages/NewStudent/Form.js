import React from "react";

const Form = ({ handleChange, handleSubmit, state }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h4>Profile Picture</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange}
            type="file"
            name="profile_pic"
            accept="image/*"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange}
          name="name"
          type="text"
          className="form-control"
          value={state.name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Class</label>
        <input
          onChange={handleChange}
          name="grade"
          type="text"
          className="form-control"
          value={state.grade}
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
        <label className="text-muted">Phone</label>
        <input
          onChange={handleChange}
          name="phone"
          type="number"
          className="form-control"
          value={state.phone}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Address</label>
        <input
          onChange={handleChange}
          name="address"
          type="text"
          className="form-control"
          value={state.address}
        />
      </div>

      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default Form;
