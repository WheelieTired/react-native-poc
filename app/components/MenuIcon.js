import React, { Component } from 'react';
import { TouchableHighlight, Image} from 'react-native';

export default class MenuIcon extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      navigation: props.nav
    }
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.state.navigation.navigate('DrawerOpen')}>
          <Image source={require('../images/menu_burger.png')} />
      </TouchableHighlight>
    );
  }
}
