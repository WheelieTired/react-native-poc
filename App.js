import React, {Component} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Registration from './app/components/registration';
import Map from './app/components/map';



const Router = StackNavigator({
    mapRoute: { screen: Map },
},
{
    initialRouteName: 'mapRoute',
    lazy: 'false'
});

export default class App extends Component{
  render(){
    return <Router />;
  }
}
