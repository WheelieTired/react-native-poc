import React, {Component} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

//Pages
import AddPoint from './app/components/AddPoint';
import Login from './app/components/login';
import Registration from './app/components/registration';
import Map from './app/components/map';
import ChangePassword from './app/components/changePassword'
import ForgotPassword from './app/components/forgotPassword'


//Menu Icon
import MenuIcon from './app/components/MenuIcon';

/**The drawer content
    For now only screen are defined here with no other styling
**/
const DrawerStack = DrawerNavigator({
    Map: { screen: Map },
    AddPoint: {screen: AddPoint},
    Register: { screen: Registration },
    Login: { screen: Login },
    ChangePassword: { screen: ChangePassword },
    ForgotPassword: {screen: ForgotPassword }
})

/**
    This wraps the DrawerNavigator so that the header can be set at the top layer
    Essentially only the navigation options matter here and are used to define the header through
    the MenuIcon component.
**/
const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: 'white'},
    headerLeft:  <MenuIcon nav={navigation} />
  })
})

/** Main Router
    In case we want to add functionality that requires login we can hide those pages in another
    StackNavigator like 'menu' which will become visibile after login and only the LoginStack would
    be visible
**/
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
