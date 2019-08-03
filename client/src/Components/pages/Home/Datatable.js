import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition
} from "griddle-react";
import { removeStudent } from "../../../Utils/Requests";

const Datatable = ({ datas, history }) => {
  console.log(datas);

  let data = [];
  datas.map(ele => {
    let element = {};
    element.image = ele._id;

    element.name = ele.name;
    element.grade = ele.grade;
    element.email = ele.email;
    element.actions = ele._id;
    data.push(element);
  });

  console.log(data);

  const imageComponent = e => (
    <div>
      <img
        src={`http://localhost:8000/api/student/photo/${e.value}`}
        alt={`students${e.value}`}
        // onError={i => (i.target.src = `${DefaultPost}`)}
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
          const result = await removeStudent(e.value);
          if (result.status === 200) {
            window.location.reload();
          }
        }}
      >
        Delete
      </button>
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
              {/* <CSVLink data={data}>CSV</CSVLink> */}
              <span>Print</span>
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
        </RowDefinition>
      </Griddle>
    </>
  );
};

export default withRouter(Datatable);
