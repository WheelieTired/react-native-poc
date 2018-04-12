import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red',
  },
});

class DrawerContent extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <Button onPress={Actions.pop}>Back</Button>
        <Button onPress={Actions.tab_1}>Switch to Map</Button>
        <Button onPress={Actions.tab_2}>Switch to Register Page</Button>
        <Button onPress={Actions.tab_3}>Switch to Reset Password Page</Button>
        <Button onPress={Actions.tab_4}>Switch to Login Page</Button>

      </View >
    );
  }
}

export default DrawerContent;
