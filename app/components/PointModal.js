import React, { Component } from "react";
import { StyleSheet, Text, TouchableHighlight, View, Button } from "react-native";
import Modal from "react-native-modal";
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import Map from './Map'

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    flex: 0.1,
    backgroundColor:'white'
  }
})

export default class PointModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      isModalVisible: props.isModalVisible
    };
  }
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={styles.footer}>
        <Button onPress={this._toggleModal} title='Add Point'/>
      </View>
    );
  }
}