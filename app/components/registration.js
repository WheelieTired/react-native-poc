import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView, Image } from 'react-native';

import t from 'tcomb-form-native'; // 0.6.9
import * as usersApi from '../data/users/api';
import * as session from '../services/session';
import * as api from '../services/api';
import apiConfig from '../services/api/config';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String,
  confirmPassword: t.String,
  firstName: t.String,
  lastName: t.String
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
      error: 'Please enter a password that is at least 3 characters'
    },
    confirmPassword: {
      error: 'Password field does not match',
    },
    firstName: {
          error: 'Please enter a valid first name',
    },
    lastName: {
          error: 'Please enter a valid last name',
    },
  },
  stylesheet: formStyles,
};

export default class Registration extends Component {

  constructor(props) {
  		super(props);

  		this.initialState = {
  			isLoading: false,
  			error: null,
  			email: '',
  			password: '',
  			confirmPassword: '',
  			firstName: '',
  			lastName: '',
  		};
  		this.state = this.initialState;
  }

  handleSubmit = () => {
    this.setState({
        isLoading: true,
        error: '',
    });
    const value = this._form.getValue();
    this.state = value;
    var url = apiConfig.productionurl + '/users';

    if(this.state != null){
        const { firstName, lastName, email, password } = this.state;
        var data = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password };

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
            .then(response => console.log('Success:', response)); // parses response to JSON
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
            type={User}
            options={options}
        />
        <Button
            title="Sign Up!"
            onPress={this.handleSubmit}
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
});
