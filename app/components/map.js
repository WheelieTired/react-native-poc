/* Temporary file to from tutorial to test out environment */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import markerIcon from '../images/marker-icon.png';


Mapbox.setAccessToken('pk.eyJ1IjoiYWNhLW1hcGJveCIsImEiOiJjajhkbmNjN2YwcXg0MnhzZnU2dG93NmdqIn0.jEUoPlUBoAsHAZw5GKpgiQ');


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon:{
    flex:1,
    iconImage: {markerIcon},
  }
});

const PointCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'TestPoint',
      properties: {
        icon: markerIcon,
      },
      geometry: {
        type: 'Point',
        coordinates: [43, -77],
      },
    }]};

export default class Map extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={"mapbox://styles/aca-mapbox/cj8w8rbjnfwit2rpqudlc4msn"}
          zoomLevel={1}
          centerCoordinate={[-77.6109, 43.1610]}
          style={styles.container}>
          <Mapbox.ShapeSource
            id="pointShape"
            shape={PointCollection}
            images={{icon: markerIcon}}
            >
            <Mapbox.SymbolLayer id="pointSymbol" style={styles.icon} />
          </Mapbox.ShapeSource>
        </Mapbox.MapView>
      </View>
    );
  }
}

