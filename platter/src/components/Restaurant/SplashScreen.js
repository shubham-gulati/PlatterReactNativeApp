import React from "react";

import { View, Text, StyleSheet } from "react-native";

const ACCESS_TOKEN = "access_token";

export default class SplashScreen extends React.Component {
  
  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      return token;
    } catch (error) {
      console.warn("Something went wrong get");
    }
  }

  // componentDidMount = () => {
  //   setTimeout(() => {
  //     let token = this.getToken();
  //     console.warn(token);
  //     if (token) {
  //        this.props.navigation.replace("DrawerScreens"); 
  //     } else {
  //       this.props.navigation.replace("Login");
  //     }
  //   }, 3000);
  // };


  componentDidMount = () => {
    setTimeout(() => {
        this.props.navigation.replace("Login");
    }, 3000);
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
