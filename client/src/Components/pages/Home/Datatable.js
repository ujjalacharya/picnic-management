import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition
} from "griddle-react";
import { removeStudent } from "../../../Utils/Requests";
import { CSVLink } from "react-csv";

const Datatable = ({ datas, history }) => {
  const [checked, setCheked] = useState([]);
  console.log(datas);

  let data = [];
  datas.map(ele => {
    let element = {};
    element.image = ele._id;

    element.name = ele.name;
    element.grade = ele.grade;
    element.email = ele.email;
    element.actions = ele._id;
    element.selectStudents = ele._id;
    data.push(element);
  });

  console.table(data);

  const imageComponent = e => (
    <div>
      <img
        src={`${process.env.REACT_APP_API_URL}/student/photo/${e.value}?${new Date().getTime()}`}
        alt={`students${e.value}`}
        // onError={i => (i.target.src = `${DefaultPhoto}`)}
        className="img-thunbnail mb-3"
        style={{
          height: "3.5rem",
          width: "10%%",
          objectFit: "cover"
        }}
      />
    </div>
  );

  const actionComponent = e => (
    <div>
      <button className="btn btn-info">
        <Link to={`edit-student/${e.value}`}>Edit</Link>
      </button>
      <button
        className="btn btn-danger"
        onClick={async () => {
          if(window.confirm("Are you sure?")){
            const result = await removeStudent(e.value);
            if (result.status === 200) {
              window.location.reload();
            }
          }
        }}
      >
        Delete
      </button>
    </div>
  );

  const handleChange =  id => () => {
    console.log("checked", checked)

    const currentCategoryId = checked.indexOf(id);
    const newCheckedCategoryId = [...checked];
  
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(id);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    console.log("newchecked", newCheckedCategoryId)
    setCheked(newCheckedCategoryId);

    console.log(checked)

  };

  const selectStudentsComponent = e => (
    <div>
      <input
        type="checkbox"
        name="select"
        value={e.value}
        onChange={handleChange(e.value)}
      />
    </div>
  );

  const NewLayout = ({ Table, Filter, Pagination }) => (
    <div style={{ width: "98%" }}>
      <div className="row search-export">
        <div className="col-xl-6" style={{ paddingLeft: 0 }}>
          <h2>All Students</h2>
        </div>
        <div className="col-xl-6" style={{ paddingRight: 0 }}>
          <div className="row">
            <div className="col-xl-8">
              <Filter />
            </div>
            <div className="col-xl-4 export">
              <CSVLink data={datas}>Print</CSVLink>
            </div>
          </div>
        </div>
      </div>
      <Table />
      <Pagination />
    </div>
  );

  const styleConfig = {
    classNames: {
      Table: "table table-striped",
      Filter: "form-control",
      NextButton: "griddle-next-button btn-primary",
      PreviousButton: "griddle-previous-button btn-primary"
    }
  };

  return (
    <>
      {console.log(checked)}
      <button
        className="btn btn-info mb-4"
        onClick={() => {
          history.push("/new-student");
        }}
      >
        Add New Student
      </button>
      <Griddle
        data={data}
        plugins={[plugins.LocalPlugin]}
        settings={false}
        components={{
          Layout: NewLayout
        }}
        styleConfig={styleConfig}
      >
        <RowDefinition>
          <ColumnDefinition
            id="image"
            title="Photo"
            customComponent={e => imageComponent(e)}
          />
          <ColumnDefinition id="name" title="Name" />
          <ColumnDefinition id="email" title="Email" />
          <ColumnDefinition id="grade" title="Class" />
          <ColumnDefinition
            id="actions"
            title="Actions"
            customComponent={e => actionComponent(e)}
          />
          <ColumnDefinition
            id="selectStudents"
            title="Select Students"
            customComponent={e => selectStudentsComponent(e)}
          />
        </RowDefinition>
      </Griddle>
    </>
  );
};

export default withRouter(Datatable);
