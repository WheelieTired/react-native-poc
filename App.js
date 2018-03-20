import React, {Component} from 'react';
import { Stack, Scene, Router, Actions} from 'react-native-router-flux';
import { Stylesheet, Text, View, Image} from 'react-native';

import CustomNavBarView from "./app/components/CustomNavBarView";
import CustomNavBar from "./app/components/CustomNavBar";
import CustomNavBar2 from "./app/components/CustomNavBar2";

import Map from './app/components/map'
import LoginPage from './app/components/login-page'

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="Map" component={LoginPage} title="Home" />


      <Stack key="customNavBar" hideTabBar titleStyle={{alignSelf: 'center'}}>
                    <Scene
                      key="customNavBar1"
                      title="CustomNavBar 1"
                      navBar={CustomNavBar}
                      component={CustomNavBarView}
                      back
                    />
                    <Scene
                      key="customNavBar2"
                      title="CustomNavBar 2"
                      navBar={CustomNavBar}
                      component={CustomNavBarView}
                      back
                    />
                    <Scene
                      key="customNavBar3"
                      title="Another CustomNavBar"
                      navBar={CustomNavBar2}
                      component={CustomNavBarView}
                      back
                    />
                    <Scene
                      key="hiddenNavBar"
                      title="hiddenNavBar"
                      component={CustomNavBarView}
                      hideNavBar={true}
                      back
                    />
                  </Stack>
              </Stack>
    </Router>
  );
};

export default RouterComponent
