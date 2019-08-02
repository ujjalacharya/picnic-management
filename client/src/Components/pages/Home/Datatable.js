import React from 'react';
import { MDBDataTable } from 'mdbreact';

const Datatable = ({data}) => {

 console.log(data)

  return (
    <MDBDataTable
      striped
      bordered
      hover
      data={data}
    />
  );
}

export default Datatable;