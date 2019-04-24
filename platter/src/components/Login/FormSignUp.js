import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, SafeAreaView, Keyboard, 
  TouchableOpacity, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Alert} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const DismissKeyboard =({children}) => (
 <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
</TouchableWithoutFeedback>
);

export default class FormSignUp extends Component {

constructor() {
  super();
  this.state={
    name:'',
    email:'',
    password:'',
    mobile_number:'',
    errors: []
  }
}

updateValue(text, field) {
  if (field == 'email') {
      this.setState({
        email:text,
      })
  } else if (field == 'password') {
      this.setState({
        password:text,
      })
  } else if (field == 'name') {
      this.setState({
        name:text,
      })
  } else if (field == 'mobile_number') {
      this.setState({
        mobile_number:text,
      })
  }
}

async submit() {
  try {
   let response = await fetch('http://ec2-18-188-129-136.us-east-2.compute.amazonaws.com:3000/api/v1/signup',{
      // let response = await fetch("http://localhost:3000/api/v1/login", {
        method: 'POST',
        body: JSON.stringify({
          user : {
            email : this.state.email,
            password : this.state.password,
            mobile_number: this.state.mobile_number,
            name: this.state.name
          }
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    });
  
    let res = await response.text();
    console.warn("res is :"+res);
    var JSONObject = JSON.parse(res);


    if (JSONObject['status'] == 200) {
       Alert.alert(
        'Succesful Signup',
        'Redirecting to Platter Restaurants',
        [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
      );
      this.props.goToRestaurant();
    } else {
      Alert.alert(
        'Some error occurred',
        'User is either registered already or incomplete details',
        [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
      );
      let errors = res;
      throw errors;
    }

  } catch(errors) {

  }
}


render() {
	return (
            <DismissKeyboard>
            <View style={styles.container}>
              <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Name" placeholderTextColor="#000" onChangeText={(text) => this.updateValue(text, 'name')}/>
              <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' selectionColor="#fff" keyboardType="email-address" placeholder="Email" placeholderTextColor="#000" 
              onChangeText={(text) => this.updateValue(text, 'email')} onSubmitEditing={()=>this.password.focus()}/>
              <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' onChangeText={(text) => this.updateValue(text, 'password')} placeholder="Password" secureTextEntry={true} placeholderTextColor="#000" ref={(input) => this.password = input}/>
              <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' onChangeText={(text) => this.updateValue(text, 'password')} placeholder="Confirm Password" secureTextEntry={true} placeholderTextColor="#000" ref={(input) => this.password = input}/>
              <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Mobile" onChangeText={(text) => this.updateValue(text, 'mobile_number')} maxLength={10} keyboardType='numeric' placeholderTextColor="#000"/>
              <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
              <Text style={styles.buttonText}>{this.props.type}</Text>
              </TouchableOpacity>
               <KeyboardSpacer />
          </View>
           </DismissKeyboard>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  inputBox: {
    width: 300,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal : 16,
    marginVertical:10
  },
  
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  
  button: {
    width:300,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12
  }
  
  });