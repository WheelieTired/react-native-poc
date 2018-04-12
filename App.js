import React, {Component} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Registration from './app/components/registration';
import Map from './app/components/map';
import MenuIcon from './app/components/MenuIcon';

const DrawerStack = DrawerNavigator({
    map: { screen: Map },
    register: { screen: Registration}
})

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: 'white'},
    headerLeft:  <MenuIcon nav={navigation} />
  })
})

const Router = StackNavigator({
    menu: {screen: DrawerNavigation},
},
{
    initialRouteName: 'menu',
});

export default class App extends Component{
constructor(props){
super(props);
}
  render(){
    return <Router />;
  }
}
