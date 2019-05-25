import React from "react";

import { View, Text, StyleSheet } from "react-native";
import {AsyncStorage} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';

const ACCESS_TOKEN = "access_token";
const EMAIL = "email_stored";

export default class SplashScreen extends React.Component {
  
  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      return token;
    } catch (error) {
      console.warn("Something went wrong get");
    }
  }

  // async componentDidMount() {
  //   let token = "";
  //   let email = "";
    
  //   setTimeout(() => {
  //       try {
  //          token = AsyncStorage.getItem(ACCESS_TOKEN);
  //          email = AsyncStorage.getItem(EMAIL);
  //         } catch (error) {
  //            console.warn("Something went wrong get");
  //         }
        
  //       console.warn("token in splash");
  //       console.warn(token);
  //       console.warn(email);
        
  //       if (token && email) {
  //          this.props.navigation.replace("tabs", {email: email});
  //       } else {
  //           this.props.navigation.replace("Login");
  //       }
  //   }, 3000);
  // };

  async componentDidMount() {
    let token = "";
    let email = "";

    try {
        token = await AsyncStorage.getItem(ACCESS_TOKEN);
        email = await AsyncStorage.getItem(EMAIL);
      } catch (error) {
         console.warn("Something went wrong get");
      }
        
    console.warn("token in splash");
    console.warn(token);
    console.warn(email);
    
    if (email != null && email != "") {
      email = email.replace(/\"/g, "");
    }
    
    if (token && email) {
        setTimeout(() => {
        this.props.navigation.replace("tabs", {email: email});
      }, 3000);
    } else {
       setTimeout(() => {
        this.props.navigation.replace("Login");
    }, 3000);
    }
  };
  
  render() {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Text style={styles.text}>Welcome to Platter</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
  text: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  }
});
