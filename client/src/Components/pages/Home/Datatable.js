import React from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

const Datatable = ({ data }) => {
  console.log(data);

  return (
    <>
      <button className="btn btn-info mb-4">
        <Link to="/new-student">Add New Student</Link>
      </button>
      <MDBDataTable striped bordered hover data={data} />
    </>
  );
};

export default Datatable;
