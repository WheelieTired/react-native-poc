/* Temporary file to from tutorial to test out environment */

import React, { Component } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import {GetPoints, ReplicateFromDB} from '../data/point/point';
import PointModal from './PointModal';

import markerIcon from '../images/marker-icon.png';
import PouchDB from 'pouchdb-react-native';

const db = new PouchDB('points');
const remotedb = new PouchDB('http://52.91.46.42:5984/points', {
    auth: {
    username: 'btc-admin',
    password: 'damsel-custard-tramway-ethanol'
    }
  });

Mapbox.setAccessToken('pk.eyJ1IjoiYWNhLW1hcGJveCIsImEiOiJjajhkbmNjN2YwcXg0MnhzZnU2dG93NmdqIn0.jEUoPlUBoAsHAZw5GKpgiQ');


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons:{
    flex:.2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});


const layerStyles = Mapbox.StyleSheet.create({
  singlePoint: {
    iconImage: markerIcon,
    iconSize: 1,
    iconAllowOverlap: true
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

export default class Map extends Component<{}> {

  constructor(props){
    super(props);

    this.state = {
      pointsLoaded: false,
      center: [-77.6109, 43.1610],
      points: null,
      addPoint: false
    };

    this.createPointCollection = this.createPointCollection.bind(this);
    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    this.setPointLocation = this.setPointLocation.bind(this);
    //this._onPressButton = this._onPressButton.bind(this);
  }



  async onRegionDidChange() {
    const center = await this._map.getCenter();
    this.setState({center});
  }
  async setPointLocation(){
    const center = await this._map.getCenter();
    this.setState({center});
  }

  createPointCollection(that){ }

  componentDidMount(){
    var that = this;
      PouchDB.replicate(remotedb, db).on('change', function (info) {
      // handle change
      }).on('paused', function (err) {
      // replication paused (e.g. replication up to date, user went offline)
      }).on('active', function () {
      // replicate resumed (e.g. new changes replicating, user went back online)
      }).on('denied', function (err) {
      // a document failed to replicate (e.g. due to permissions)
      }).on('complete', function (info) {
        console.log("points copied from db");
        console.log("grabbing points from local db");
          db.allDocs({ startkey: "point", endkey: "point\ufff0" }).then(function (result) {
            var docs = result.rows.map(function (row) {
              return row.doc.location;
            });
            console.log(docs);
            const PointCollection = {
              type: 'FeatureCollection',
              features: []
            };

            for(var i=0; i<docs.length; i++){
              if(docs[i]){
                PointCollection.features.push({
                  type: 'Feature',
                  id: 'TestPoint',
                  properties: {
                    icon: 'circle-15',
                  },
                  geometry: {
                     type: 'Point',
                     coordinates: [docs[i][1], docs[i][0]]
                  }
                });
                }
              }

              that.setState({
                pointsLoaded: true,
                points: PointCollection
              });

          }).catch(function (err) {
            console.log(err);
          });
      }).on('error', function (err) {
         console.log(err.message);
      });
    }

  render() {
    if(this.state.pointsLoaded){
    //console.log('state', this.state);
    var that = this;
    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={"mapbox://styles/aca-mapbox/cj8w8rbjnfwit2rpqudlc4msn"}
          zoomLevel={1}
          centerCoordinate={[-77.6109, 43.1610]}

          ref={(c) => (this._map = c)}
          style={styles.container}>
          <Mapbox.ShapeSource
            id="points"
            cluster
            clusterRadius={50}
            clusterMaxZoom={14}
            shape={this.state.points}
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
          <Mapbox.SymbolLayer
            id="singlePoint"
             filter={['!has', 'point_count']}
             style={layerStyles.singlePoint}
          />
          </Mapbox.ShapeSource>

        </Mapbox.MapView>

      </View>
    );
    }
    else{
        console.log('no points', this.state);
        return null;
    }
  }
}
