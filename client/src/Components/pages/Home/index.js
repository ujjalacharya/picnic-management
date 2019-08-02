import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import { getUsername, getStudents } from "../../../Utils/Requests";
import Datatable from "./Datatable";

const Home = () => {
  const [data, setData] = useState({
    columns: [
     {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 150
    }, 
     {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 200
    }, 
     {
      label: "Class",
      field: "class",
      sort: "asc",
      width: 100
    }, 
    ],
    rows: []
  });

  const tableRows = useState([])

  const [error, setError] = useState(false);

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = async () => {
    const students = await getStudents().catch(err => {
      setError(err.response.data.error);
    });

    if (students && students.status === 200) {

     for(let i=0; i<students.data.length; i++){
      delete students.data[i]._id;
     }

      setData({ ...data, rows: students.data });
    }
  };

  const showError = () => <div className="alert alert-danger">{error}</div>;

  return (
    <Layout title={`Howdy! ${getUsername()}`}>
      {error ? showError() : <Datatable data={data} />}
    </Layout>
  );
};

export default Home;
