/* Temporary file to from tutorial to test out environment */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken('pk.eyJ1IjoiYWNhLW1hcGJveCIsImEiOiJjajhkbmNjN2YwcXg0MnhzZnU2dG93NmdqIn0.jEUoPlUBoAsHAZw5GKpgiQ');

export default class Map extends Component {

  getInitialState() {
    return {
      mapLocation: {
        latitude: 0,
        longitude: 0
      },
      center: {
        latitude: 43.1610,
        longitude: -77.6109
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
          style={styles.container}>
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
