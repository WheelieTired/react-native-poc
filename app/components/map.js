/* Temporary file to from tutorial to test out environment */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
//import markerIcon from '../images/marker-icon.png';


Mapbox.setAccessToken('pk.eyJ1IjoiYWNhLW1hcGJveCIsImEiOiJjajhkbmNjN2YwcXg0MnhzZnU2dG93NmdqIn0.jEUoPlUBoAsHAZw5GKpgiQ');


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon:{
    flex:1,
    //iconImage: {markerIcon},
  }
});

const layerStyles = Mapbox.StyleSheet.create({
  singlePoint: {
    circleColor: 'green',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 5,
    circlePitchAlignment: 'map',
  },

  clusteredPoints: {
    circlePitchAlignment: 'map',
    circleColor: Mapbox.StyleSheet.source(
      [
        [25, 'yellow'],
        [50, 'red'],
        [75, 'blue'],
        [100, 'orange'],
        [300, 'pink'],
        [750, 'white'],
      ],
      'point_count',
      Mapbox.InterpolationMode.Exponential,
    ),

    circleRadius: Mapbox.StyleSheet.source(
      [[0, 15], [100, 20], [750, 30]],
      'point_count',
      Mapbox.InterpolationMode.Exponential,
    ),

    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },

  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textPitchAlignment: 'map',
  },
});

const PointCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'TestPoint',
      properties: {
        icon: 'circle-15',
      },
      geometry: {
        type: 'Point',
        coordinates: [-78, 39],
      },
    },{
      type: 'Feature',
      id: 'TestPoint1',
      properties: {
        icon: 'circle-15',
      },
      geometry: {
        type: 'Point',
        coordinates: [-77, 39],
      },
    },{
      type: 'Feature',
      id: 'TestPoint2',
      properties: {
        icon: 'circle-15',
      },
      geometry: {
        type: 'Point',
        coordinates: [-70, 40],
      },
    },
    ]};

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
            id="earthquakes"
            cluster
            clusterRadius={50}
            clusterMaxZoom={14}
            shape={PointCollection}
            >
            <Mapbox.SymbolLayer
              id="pointCount"
              style={layerStyles.clusterCount}
            />

            <Mapbox.CircleLayer
              id="clusteredPoints"
              belowLayerID="pointCount"
              filter={['has', 'point_count']}
              style={layerStyles.clusteredPoints}
            />

            <Mapbox.CircleLayer
              id="singlePoint"
              filter={['!has', 'point_count']}
              style={layerStyles.singlePoint}
            />
          </Mapbox.ShapeSource>
        </Mapbox.MapView>
      </View>
    );
  }
}
