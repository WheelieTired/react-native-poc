import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import t from 'tcomb-form-native'; // 0.6.9
import * as usersApi from '../data/users/api';
import * as session from '../services/session';
import * as api from '../services/api';
import apiConfig from '../services/api/config';

const Form = t.form.Form;

const Account = t.struct({
  email: t.String,
  password: t.String
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    email: {
      error: 'Please enter a valid email'
    },
    password: {
      error: 'Please enter your password'
    }
  },
  stylesheet: formStyles,
};

export default class Login extends Component {

  constructor(props) {
  		super(props);

  		this.initialState = {
  			isLoading: false,
  			error: null,
  			email: '',
  			password: '',
  		};
  		this.state = this.initialState;
  }

  loginSubmit = () => {
    this.setState({
        isLoading: true,
        error: '',
    });
    const value = this._form.getValue();
    this.state = value;

    var url = apiConfig.productionurl + '/users/auth';
    // var url = 'http://192.168.0.111:1337' + '/users/auth';
    if(this.state != null){
        const { email, password } = this.state;
        var data = { name: this.state.email, password: this.state.password };

        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: new Headers({
                'Content-Type': 'application/json',
                'Client-ID': apiConfig.clientId
            }),
            mode: 'no-cors',
            body: JSON.stringify(data), // must match 'Content-Type' header

        })
        .then(response => response.json())
        .catch(error => console.log('Error:', error))
        .then(response => {
            console.log('Success:', response);
            Actions.tab_1();
        }); // parses response to JSON
    }
  }

  render() {
    return (

      <View style={styles.container}>
      <ScrollView>
        <Image
            style={styles.icon}
            source={require('../../img/advc-big.jpg')}
        />
        <Form
            ref={c => this._form = c}
            type={Account}
            options={options}
        />
        <Button
            title="Login"
            style={styles.button}
            onPress={this.loginSubmit}
        />
        <Button
            title="Register"
            style={styles.button}
            color='#757575'
            onPress={() => { this.props.navigation.navigate('Register'); }}
        />
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 20
  }
});
