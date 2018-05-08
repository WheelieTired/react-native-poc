import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView, Image } from 'react-native';

import t from 'tcomb-form-native'; // 0.6.9
import * as usersApi from '../data/users/api';
import * as session from '../services/session';
import * as api from '../services/api';
import apiConfig from '../services/api/config';

const Form = t.form.Form;

function samePasswords(password, confirmPassword) {
  return password === confirmPassword
}

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

const User = t.struct({
  email: Email,
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
      error: 'Please enter a password that is at least 3 characters',
      password: true,
      secureTextEntry: true
    },
    confirmPassword: {
      error: 'Password field does not match',
      password: true,
      secureTextEntry: true
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
  			options: options,
  		};
  		this.state = this.initialState;
  }

  handleSubmit = () => {
    this.setState({
        isLoading: true,
        error: '',
    });
    const value = this._form.getValue();

    var url = apiConfig.productionurl + '/users';

    if(value != null){
        const { firstName, lastName, email, password, confirmPassword } = value;

         if (password && confirmPassword && !samePasswords(password, confirmPassword)) {
                this.setState({options: t.update(this.state.options, {
                  fields: {
                    confirmPassword: {
                      hasError: { '$set': true },
                      error: { '$set': 'Password must match' }
                    }
                  }
            })})
         }

         else{

        var data = { firstName: value.firstName, lastName: value.lastName, email: value.email, password: value.password };

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

    }

  onChange = (value) => {
    this.setState({value})
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
            options={this.state.options}
            value={this.state.value}
            onChange={this.onChange}
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
