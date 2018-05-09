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
      error: 'Please enter your email'
    },
  },
  stylesheet: formStyles,
};

export default class ChangePassword extends Component {
  constructor(props) {
      super(props);

      this.initialState = {
        isLoading: false,
        error: null,
        email: '',
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

    var url = apiConfig.productionurl + `/users/forgotPassword`;

    if(this.state != null){
        const {email} = this.state;

        var data = {email: this.state.email};
        console.log(url);


        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: new Headers({
                'Content-Type': 'application/json',
                'Client-ID': apiConfig.clientId,
            }),
            mode: 'no-cors',
            body: JSON.stringify(data), // must match 'Content-Type' header

        })
        .then(response => {console.log("JSON OUTPUT", response);
            return response.json();})
        //.then(responseData => {console.log(responseData); return responseData;})
        .catch(error => console.log('Error: This is your error', error))
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
            title="Submit!"
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
