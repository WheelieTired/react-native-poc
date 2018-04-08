import React, {Component} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Registration from './app/components/registration';
import Map from './app/components/map';



const Router = StackNavigator({
    map: { screen: Map },
    register: { screen: Registration },
},
{
    initialRouteName: 'map',
});

export default class App extends Component{
  render(){
    return <Router />;
  }
}
