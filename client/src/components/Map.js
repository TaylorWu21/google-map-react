import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { setFlash } from '../actions/flash';
import { connect } from 'react-redux';
import axios from 'axios';
import { 
  Button,
  Segment,
  Header,
  Form,
  Divider,
  Input,
} from 'semantic-ui-react';

class Map extends Component {
  static defaultProps = {
    center: { lat: 40.760551, lng: -111.882587 },
    zoom: 16
  }

  state = {
    center: this.props.center,
    zoom: this.props.zoom,
    address: 'Devpoint Labs',
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position => {
        let { coords: { latitude, longitude } } = position;
        this.setState({ loaded: true, center: { lat: latitude, lng: longitude } });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  handleChange = (e) => {
    this.setState({ address: e.target.value });
  }

  createMapOptions() {
    return {
      panControl: true,
      mapTypeControl: true,
      scrollWheel: true
    }
  }

  findAddress = (e) => {
    e.preventDefault();
    let { dispatch } = this.props;
    let address = this.state.address;

    axios.get(`/api/location?address=${address}`)
      .then(res => {
        let { data } = res;
        this.setState({ address, center: { lat: data[0], lng: data[1] } });
        dispatch(setFlash('Address Found!', 'success'));
      })
      .catch( response => {
        dispatch(setFlash('Error finding address. Try again!', 'error'));
      });
  }

  render() {
    let { center, zoom, address } = this.state;
    return (
      <Segment> 
        <Header as='h2'>Google Map - Address Checker</Header>
        <Form onSubmit={this.findAddress}>
          <Input
            value={address}
            onChange={this.handleChange}
            placeholder='Find an Address'
          />
          <Button primary type='submit'>Go!</Button>
          <Divider />
          <Segment basic style={{height: '600px', width: '600px', margin: '0 auto'}}>
            <GoogleMapReact
              options={this.createMapOptions}
              defaultCenter={center}
              defaultZoom={zoom}
              center={center}
            >
            </GoogleMapReact>
          </Segment>
        </Form>
      </Segment>
    );
  }
}



export default connect()(Map);