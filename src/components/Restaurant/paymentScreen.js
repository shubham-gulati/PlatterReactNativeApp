import React, { Component } from "react";
import { StyleSheet, View, Switch ,  Keyboard,  TouchableWithoutFeedback, Button, TouchableHighlight, Text, Alert} from "react-native";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import {AsyncStorage} from 'react-native';
import MyHeader from "./customHeader";
import Loader from "./loader";
const EMAIL = "email_stored";



const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
   fullWidthButton: {
    marginTop: 30,
    backgroundColor: 'blue',
    height:70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButtonText: {
    fontSize:24,
    color: 'white'
  }
});

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Payment extends React.Component {
  state = { useLiteCreditCardInput: false, data: [], tokenData: '', loading:false, email:''};

   
  _onChange = (formData) => {
    this.setState({
      data: JSON.stringify(formData) 
    })
  };
  
  _onFocus = (field) => console.log("focusing", field);
  _setUseLiteCreditCardInput = (useLiteCreditCardInput) => this.setState({ useLiteCreditCardInput });

  //console.warn('button was pressed!');
    
  sleep = (ms) => {
     return new Promise(resolve => setTimeout(resolve, ms));
  }

  async buttonPressed() {
     let email = "";
       
     try {
      console.warn("getting email");
        email = await AsyncStorage.getItem(EMAIL);
        console.warn(email);
      } catch (error) {
         console.warn("Something went wrong get");
      }

      email = email.replace(/\"/g, "");

      console.warn("email is");
      console.warn(email);
      
      this.setState({
        email:email
      });


    if (this.state.data === undefined || this.state.data.length == 0 || this.state.email == '') {
      Alert.alert(
            'Some Error Occured',
            'Please Enter All Details',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
      
      return;
    }
    
    console.warn(this.state.data);
    let d = JSON.parse(this.state.data);
    //console.warn(JSON.parse(this.state.data));
    let number = d['values']['number'];
    let cvc = d['values']['cvc'];
    let expiry = d['values']['expiry'].split("/");
    
    if ((expiry === "") || (cvc === "") || (number === "")) {
         Alert.alert(
            'Some Error Occured',
            'Please Enter All Details',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
    
         return;
    }
    
    let exp_month = expiry[0];
    let exp_yr = expiry[1];


    // this.setState({
    //   loading: true
    // });

     fetch('https://api.stripe.com/v1/tokens?card[number]='+number+'&card[exp_month]='+exp_month+'&card[exp_year]='+exp_yr+'&card[cvc]='+cvc+'&amount=1&currency=usd', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer sk_test_Exsg9IzoUZSav22qakc5DmRk00X6zOi4Yq"
    }
  })
    .then(resp => resp.json())
     .then(data => {
        fetch("http://ec2-18-188-129-136.us-east-2.compute.amazonaws.com:3000/api/v1/newPlatterMember", {
      // let response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
            email: this.state.email,
            is_platter_member: 1
        }),
        
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(resp => resp.json())
     .then(data => {

      this.setState({loading: false});

      setTimeout(()=>{ }, 2000);

       Alert.alert(
            'Congratulations. Payment Successful',
            'You are a Platter Member Now',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.props.navigation.navigate("Restaurant", {email:this.state.email})},
            ],
            {cancelable: false},
          );
      
      });
    });
  }

  render() {
    return (
      <DismissKeyboard>
      <View style={s.container}>
        <MyHeader navigation={this.props.navigation} title="Payments"/>
        <Loader
          loading={this.state.loading} />
        <Switch
          style={s.switch}
          onValueChange={this._setUseLiteCreditCardInput}
          value={this.state.useLiteCreditCardInput} />

        { this.state.useLiteCreditCardInput ?
          (
            <LiteCreditCardInput
              autoFocus
              inputStyle={s.input}

              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          ) : (
            <CreditCardInput
              autoFocus

              requiresName
              requiresCVC
              requiresPostalCode

              labelStyle={s.label}
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          )
        }
      
   <View><Text style={s.switch}>Currently charge will be $1</Text></View>
   <TouchableHighlight style={s.fullWidthButton} onPress={() => this.buttonPressed()}>
        <Text style={s.fullWidthButtonText}>PAY</Text>
    </TouchableHighlight>
      </View>
      </DismissKeyboard>
    );
  }
}