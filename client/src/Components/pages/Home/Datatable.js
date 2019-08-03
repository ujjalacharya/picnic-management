import React from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react'; 

const Datatable = ({ data }) => {
  console.log(data);

  var data = [
    {
      "id": 0,
      "name": "Mayer Leonard",
      "city": "Kapowsin",
      "state": "Hawaii",
      "country": "United Kingdom",
      "company": "Ovolo",
      "favoriteNumber": 7
    },
    {
      "id": 1,
      "name": "Ujjwal Acharya",
      "city": "Kathmandu",
      "state": "Kathmandu",
      "country": "Nepal",
      "company": "My Company",
      "favoriteNumber": 10
    }
  ];
  const actionComponent = (e) => (
    <div>
      <button>abcd</button>
          {/* {
              this.state.alldata.properties[0].slug === '' ? <div><span></span></div> : (
                  <button className="btn btn-primary edit" id="form-edit" type="button" data-toggle="tooltip" data-placement="right" title="Edit">
                      <Link to={"/edit-property-form/"+e.value._root.entries[1][1]+"/approved"} target="_blank">
                          <i className="ion-edit" />
                      </Link>
                  </button>
              ) 
          }
          {
              this.state.alldata.properties[0].slug === '' ? '' : (
                  <button className="btn btn-danger delete" type="button" onClick={()=>this.deleteProperty(e.value._root.entries[0][1])} data-toggle="tooltip" data-placement="right" title="Delete">
                      <i className="ion-android-delete" />
                  </button>
              )
          } */}
      </div>
  );

  const NewLayout = ({ Table, Filter, Pagination}) => (
    <div style={{width:'98%'}}>
        <div className="row search-export">
            <div className="col-xl-6" style={{paddingLeft:0}}>  
                <h2>All Students</h2>
            </div>
            <div className="col-xl-6" style={{paddingRight:0}}>
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
          Table: 'table table-striped',
          Filter: 'form-control',
          NextButton: 'griddle-next-button btn-primary',
          PreviousButton: 'griddle-previous-button btn-primary'
      },
  }

  return (
    <>
      <button className="btn btn-info mb-4">
        <Link to="/new-student">Add New Student</Link>
      </button>
      {/* <MDBDataTable striped bordered hover data={data} /> */}
      <Griddle
          data={data}
          plugins={[plugins.LocalPlugin]}
          settings = {false}
          components={{
              Layout: NewLayout
          }}
          styleConfig={styleConfig}
      >
          <RowDefinition>
            <ColumnDefinition id="id" title="Id"/>
            <ColumnDefinition id="name" title="Name"/>
            <ColumnDefinition id="city" title="City"/>
            <ColumnDefinition id="state" title="State"/>
            <ColumnDefinition id="country" title="Country"/>
            <ColumnDefinition id="company" title="Company"/>
            <ColumnDefinition id="favoriteNumber" title="Favorite Number"/>
            <ColumnDefinition id="actions" title="Actions" customComponent={(e) =>actionComponent(e)} />
          </RowDefinition>
      </Griddle>

    </>
  );
};

export default Datatable;
