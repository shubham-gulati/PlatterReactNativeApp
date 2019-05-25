import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert
} from "react-native";

import {AsyncStorage} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';


const ACCESS_TOKEN = "access_token";
const EMAIL = "email_stored";

export default class FormLogin extends Component {
  
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  updateValue(text, field) {
    if (field == "email") {
      this.setState({
        email: text
      });
    } else if (field == "password") {
      this.setState({
        password: text
      });
    }
  }

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      //console.warn("email in state is");
      //console.warn(this.state.email);
      await AsyncStorage.setItem(EMAIL, JSON.stringify(this.state.email));
      //console.warn("Token Stored");
      //this.getToken();
    } catch (error) {
      console.warn("Something went wrong store");
    }
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      //console.warn(token);
    } catch (error) {
      console.warn("Something went wrong get");
    }
  }

  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
    } catch (error) {
      console.warn("Something went wrong remove");
    }
  }

  async submit() {
    try {
     let response = await fetch("http://ec2-18-188-129-136.us-east-2.compute.amazonaws.com:3000/api/v1/login", {
      // let response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password
          }
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      //console.warn(JSON.stringify(response));
      let res = await response.text();
      var JSONObject = JSON.parse(res);
      
      if (JSONObject['status'] == 200) {
        //console.warn("in success");
        //console.warn(res);
        let accessToken = res;
        this.storeToken(accessToken);
        this.props.goToRestaurant(this.state.email);
      } else {
        Alert.alert(
        'Incorrect Details',
        'Please enter correct Username/password',
        [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
      );
        let errors = res;
        throw errors;
      }
    } catch (errors) {}
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          selectionColor="#fff"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="#000"
          onChangeText={text => this.updateValue(text, "email")}
          onSubmitEditing={() => this.password.focus()}/>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#000"
          onChangeText={text => this.updateValue(text, "password")}
          ref={input => (this.password = input)}/>
        <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
          <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  inputBox: {
    width: 300,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 10
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  },

  button: {
    width: 300,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12
  }
});
