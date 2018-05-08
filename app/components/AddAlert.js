import React, { Component } from 'react'
import { View, StyleSheet, Button, ScrollView, Image, Alert } from 'react-native';
import TcombMultiSelect from './MultiSelect';
import PouchDB from 'pouchdb-react-native';
import ngeohash from 'ngeohash';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const PointAlert = t.struct({
  name: t.String,
  description: t.String,
  alert: t.list(t.String)
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

    name:{
      error: 'Please enter a name'
    },
    description: {
      error: 'Please enter a valid description'
    },
    alert: {
          error: 'Please select an alert type',
          factory: TcombMultiSelect,
          options: [
            {value: 'RoadClosure', text: 'Road Closure'},
            {value: 'ForestFire', text: 'Forest Fire'},
            {value: 'Flooding', text: 'Flooding'},
            {value: 'Detour', text: 'Detour'},
            {value: 'Other', text: 'Other'}
          ]
    },
  },
  stylesheet: formStyles,
};



export default class AddPoint extends Component<{}> {

    constructor(props) {
      		super(props);

      		this.initialState = {
      			isLoading: false,
      			error: null,
      			name: '',
      			description: '',
      			alerttype: [],
      			point: [-77.6109, 43.1610]
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
        var that = this;

        if(this.state != null){

            const { name, description, alerttype, point } = this.state;
            var hash = ngeohash.encode(point[0],point[1]);
            var data = {
                _id: 'point/alert/' + String(name).trim() + '/' + hash,
                comments: [],
                type: alerttype,
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString(),
                location: [43.1610, -77.6109],
                name: name,
                type: alert[0],
                description: description
            }
            var pouchDB = new PouchDB('http://btc-admin:damsel-custard-tramway-ethanol@52.91.46.42:5984/points');

            pouchDB.put(data, function(err, body, header){
                        if (err) {
                            console.log('error:', err.message);
                            Alert.alert(
                              'Submittion Error',
                              'There was an error with your point submission, please try again.',
                              [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                              ],
                            )
                        }
                        else{
                            console.log('alert successfully added');
                            that.props.navigation.navigate('Map');
                        }
                     });

        }
        }

    render(){
        return(
            <View style={styles.container}>
              <ScrollView>
                <Form
                    ref={c => this._form = c}
                    type={PointAlert}
                    options={options}
                />
                <Button
                    title="Add Alert"
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