import React, { Component } from 'react'
import { View, StyleSheet, Button, ScrollView, Image } from 'react-native';
import TcombMultiSelect from './MultiSelect';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const Point = t.struct({
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

        if(this.state != null){
            //const { firstName, lastName, email, password } = this.state;
            //var data = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password };
        console.log("not null", this.state);

        }
        console.log(this.state);
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