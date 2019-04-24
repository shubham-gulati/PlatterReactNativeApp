/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";

import Logo from "./Logo.js";
import FormLogin from "./FormLogin.js";

type Props = {};
export default class Login extends Component<Props> {
  signup = () => {
    // the function is anonymous arrow function to use "this" keyword
    // the navigation prop contains the navigate function, which takes
    // a key of the next screen
    this.props.navigation.navigate("Signup");
  };

  goToRestaurant = () => {
    this.props.navigation.navigate("tabs");
  }

  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <FormLogin type="Login" goToRestaurant={this.goToRestaurant}/>
        <View style={styles.signUpCont}>
          <Text style={styles.signuptext}> Dont have an account yet?</Text>
          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.signupButton}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5d6066"
  },
  imagecontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  signUpCont: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row"
  },
  signuptext: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    marginRight: 7
  },
  signupButton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500"
  }
});
