import React, { Component } from 'react'
import { View, StyleSheet, Button, ScrollView, Image, Alert } from 'react-native';
import TcombMultiSelect from './MultiSelect';
import PouchDB from 'pouchdb-react-native'
import ngeohash from 'ngeohash';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const Point = t.struct({
  name: t.String,
  description: t.String,
  phone: t.String,
  address: t.String,
  website: t.String,
  ammenity: t.list(t.String)

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
    phone: {
      error: 'Please enter a valid phone number'
    },
    address: {
      error: 'Please enter a valid address',
    },
    website: {
          error: 'Please enter a valid website',
    },
    ammenity: {
          error: 'Please select an ammenity',
          factory: TcombMultiSelect,
          options: [
            {value: 'Airport', text: 'Airport'},
            {value: 'Bar', text: 'Bar'},
            {value: 'BedAndBreakfast', text: 'Bed & Breakfast'},
            {value: 'BikeShop', text: 'Bike Shop'},
            {value: 'Cabin', text: 'Cabin'},
            {value: 'Campground', text: 'Campground'},
            {value: 'ConvenienceStore', text: 'Convenience Store'},
            {value: 'CyclistCamping', text: 'Cyclists\' Camping'},
            {value: 'CyclistsLodging', text: 'Cyclists\' Lodging'},
            {value: 'Grocery', text: 'Grocery'},
            {value: 'Hostel', text: 'Hostel'},
            {value: 'HotSpring', text: 'Hot Spring'},
            {value: 'Hotel', text: 'Hotel'},
            {value: 'Motel', text: 'Motel'},
            {value: 'Information', text: 'Information'},
            {value: 'Library', text: 'Library'},
            {value: 'Museum', text: 'Museum'},
            {value: 'OutdoorStore', text: 'Outdoor Store'},
            {value: 'RestArea', text: 'Rest Area'},
            {value: 'Restaurant', text: 'Restaurant'},
            {value: 'Restroom', text: 'Restroom'},
            {value: 'ScenicArea', text: 'Scenic Area'},
            {value: 'StatePark', text: 'State Park'},
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
      	  address: '',
      	  website: '',
      	  ammenity: [],
      	  location: []
      	};
      	this.state = this.initialState;
      	this.state.location = this.props.navigation.state.params.point;
      	//console.log("HERE IS THE LOCATION");
      	//console.log(this.props.navigation.state.params.point);
      	//console.log(this.state.location);

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


            const { name, description, phone, address, website, ammenity } = this.state;

            var hash = ngeohash.encode(this.props.navigation.state.params.point[0],this.props.navigation.state.params.point[1]);
            var data = {
                _id: 'point/service/' + String(name).trim() + '/' + hash,
                comments: [],
                amenities: ammenity,
                schedule: { default: [] },
                seasonal: false,
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString(),
                location: [this.props.navigation.state.params.point[1],this.props.navigation.state.params.point[0]],
                name: name,
                type: ammenity[0],
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
                            console.log('point successfully added');
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
                    type={Point}
                    options={options}
                />
                <Button
                    title="Add Point"
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