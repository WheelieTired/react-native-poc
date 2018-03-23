import React, {Component} from 'react'
import { Scene, Router, Actions} from 'react-native-router-flux'
import { Stylesheet, Text, View, Image} from 'react-native'

import Map from './app/components/map'
import Registration from './app/components/registration'

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="Map" component={Registration} title="Home" />
      </Scene>
    </Router>
  );
};

export default RouterComponent
