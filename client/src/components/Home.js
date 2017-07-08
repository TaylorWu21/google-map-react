import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import Map from './Map';

class Home extends Component {
  render() {
    return(
      <div>
        <Header as='h1' textAlign='center'>Home Component</Header>
        <Map />
      </div>
    );
  }
}

export default Home;
