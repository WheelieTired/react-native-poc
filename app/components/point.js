import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import {GetPoints, ReplicateFromDB} from '../data/point/point';

export default class Point extends Component<{}>{

render(){

    pointCollection = createPointCollection();

    return(

     <Mapbox.MapView
              ref={(c) => (this._map = c)}
              zoomLevel={16}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              //centerCoordinate={this.state.coordinates[0]}
              style={layerStyles}>
              {


        <Mapbox.ShapeSource
                id="earthquakes"
                cluster
                clusterRadius={50}
                clusterMaxZoom={14}
                shape={pointCollection}
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
        }
        </Mapbox.MapView>
    )
}

}


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

export function createPointCollection(){

      GetPoints().then(function(locations){

          //console.log("locations:", locations);

          const PointCollection = {
              type: 'FeatureCollection',
              features: []
          };

          for(var i=0; i<locations.length; i++){



              if(locations[i] != "undefined"){
                  PointCollection.features.push(

                  {
                      type: 'Feature',
                      id: 'TestPoint',
                      properties: {
                          icon: 'circle-15',
                      },
                      geometry: {
                          type: 'Point',
                          coordinates: locations[i],
                      }
                  }

                  );
              }
          }
      //console.log("collection",PointCollection);
      return PointCollection;
      });
      }

