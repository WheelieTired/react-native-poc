/* Temporary file to from tutorial to test out environment */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import {GetPoints, ReplicateFromDB} from '../data/point/point';
//import markerIcon from '../images/marker-icon.png';
import PouchDB from 'pouchdb-react-native'

const db = new PouchDB('points');
const remotedb = new PouchDB('http://52.91.46.42:5984/points', {
    auth: {
    username: 'btc-admin',
    password: 'damsel-custard-tramway-ethanol'
    }
  });

const coordinates = [
                      [ 46.83973203357882, -114.03678238391878 ],
                      [ 46.87295902405991, -113.99209678173067 ],
                                                                              [ 46.87093560040589, -113.99452149868013 ],
                                                                              [ 46.87096310554335, -113.9945375919342 ],
                                                                              [ 46.865206279246806, -113.99798859178875 ],
                                                                              [ 43.08234374942122, -77.67193436622621 ],
                                                                              [ 46.83984945694505, -114.03257131576538 ],
                                                                              [ 46.76437226619398, -114.0797245502472 ],
                                                                              [ 46.87228241874959, -113.99338826537132 ],
                                                                              [ 46.86556357686214, -113.99877011775972 ],
                                                                              [ 46.75803867298483, -114.08038437366487 ],
                                                                              [ 46.75703353476754, -114.08778190612794 ],
                                                                              [ 46.756276453017826, -114.08323287963869 ],
                                                                              [ 46.75783470678248, -114.08146798610689 ],
                                                                              [ 46.86461087822758, -113.99726271629335 ],
                                                                              [ 46.857618877059664, -114.01904748907329 ],
                                                                              [ 43.0819284373621, -77.67625808715822 ],
                                                                              [ 35.8356283888737, -120.65185546875001 ],
                                                                              [ 39.8145, -99.9946 ],
                                                                              [ 43.08278256665116, -77.67313599586488 ],
                                                                              [ 39.8145, -99.9946 ] ]

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



    constructor(props){

        super(props);

        this.createPointCollection = this.createPointCollection.bind(this);

        this.state = {
            pointsLoaded: false,
            points: null
        }
    }



    createPointCollection(){


              //GetPoints().then(function(locations){

                  //console.log("locations:", locations);


              }

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
                                                                                                      PointCollection.features.push(

                                                                                                      {
                                                                                                          type: 'Feature',
                                                                                                          id: 'TestPoint',
                                                                                                          properties: {
                                                                                                              icon: 'circle-15',
                                                                                                          },
                                                                                                          geometry: {
                                                                                                              type: 'Point',
                                                                                                              coordinates: [docs[i][1], docs[i][0]]
                                                                                                          }
                                                                                                      }

                                                                                                      );
                                                                                                  }
                                                                                              }
                                                                                          //console.log("collection",PointCollection);
                                                                                          //console.log(PointCollection.features)
                                                                                          that.setState({
                                                                                            pointsLoaded: true,
                                                                                            points: PointCollection
                                                                                          });
                                                                                    //return docs;
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
    else{
        console.log('no points', this.state);
        return null;
    }
  }
}

