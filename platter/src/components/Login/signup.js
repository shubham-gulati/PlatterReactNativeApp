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
import FormSignUp from "./FormSignUp.js";

type Props = {};
export default class Signup extends Component<Props> {
  goback = () => {
    // the function is anonymous arrow function to use "this" keyword
    // the navigation prop contains the goBack function
    this.props.navigation.goBack();
  };

  goToRestaurant = () => {
    this.props.navigation.navigate("Restaurants");
  }

  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <FormSignUp type="Signup" goToRestaurant={this.goToRestaurant}/>
        <View style={styles.signUpCont}>
          <Text style={styles.signuptext}>Already have an account?</Text>
          <TouchableOpacity onPress={this.goback}>
            <Text style={styles.signupButton}>Sign in</Text>
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
