import React from 'react'
import Layout from '../../core/Layout';
import { getUsername } from '../../../Utils/Requests';

function Home() {
 return (
  <Layout title={`Howdy! ${getUsername()}`}>
   <h2>Sup teacher</h2>
  </Layout>
 )
}

export default Home
