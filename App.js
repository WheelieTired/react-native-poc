import React, {Component} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Registration from './app/components/registration';
import Map from './app/components/map';

const DrawerStack = DrawerNavigator({
   map: { screen: Map },
   register: { screen: Registration}
   },{
     initialRouteName: 'map'
});

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: (navigation) => ({
    headerStyle: {backgroundColor: 'white'},
    drawerIcon: () => (
      <Image
        source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
      ),
  })
})

const Router = StackNavigator({
    menu: {screen: DrawerNavigation},
},
{
    initialRouteName: 'menu',
    headerMode: 'none'

});

export default class App extends Component{
  render(){
    return <Router />;
  }
}
