import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import { getUsername, getStudents } from "../../../Utils/Requests";
import Datatable from "./Datatable";

const Home = () => {
  const [data, setData] = useState([]);

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


      setData(students.data);
    }
  };

  const showError = () => <div className="alert alert-danger">{error}</div>;

  return (
    <Layout title={`Howdy! ${getUsername()}`}>
      {error ? showError() : <Datatable datas={data} />}
    </Layout>
  );
};

export default Home;
