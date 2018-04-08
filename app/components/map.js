/* Temporary file to from tutorial to test out environment */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken('pk.eyJ1IjoiYWNhLW1hcGJveCIsImEiOiJjajhkbmNjN2YwcXg0MnhzZnU2dG93NmdqIn0.jEUoPlUBoAsHAZw5GKpgiQ');

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.centercoordinates = undefined;    
  }
  
  myLocation() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        this.centercoordinates = [longitude, latitude]; // eslint-disable-line no-unused-vars
        console.log(this.centercoordinates);
      },
      (err) => {
        alert('Please turn on location services to find your location');
        console.error(err);
      },
      {
        timeout: 5000
      }
    );
  }

  getInitialState() {
    myLocation();
    return {
      mapLocation: {
        latitude: 0,
        longitude: 0
      },
      center: {
        latitude: this.centercoordinates[1],
        longitude: this.centercoordinates[0]
      },
      zoom: 1,
      direction: 0
    }
  }

  onChange(location) {
    this.setState({ mapLocation: location});
  }

  onOpenAnnotation(annotaion) {
    console.log(annotation)
  }

  onUpdateUserLocation(location) {
    console.log(location)
  }

  render() {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={"mapbox://stys/aca-mapbox/cj8w8rbjnfwit2rpqudlc4msn"}
          zoomLevel={1}
          centerCoordinate={this.state.center}
          style={styles.container}
          onDidFinishLoadingStyle={(map) => {
            map.addControl(new MapboxGl.NavigationControl());
            map.addControl(new MapboxGl.GeolocateControl({
              positionOptions: {
                enableHighAccuracy: true
              },
              trackUserLocation: true
            }));
          }}>
        </Mapbox.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
