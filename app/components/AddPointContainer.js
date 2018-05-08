import React, { Component } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import Map from './Map';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class MapContainer extends Component<{}> {

  render(){
  return(
    <View style={styles.container}>
        <Map addPoint={true}/>
    </View>
  )}
}