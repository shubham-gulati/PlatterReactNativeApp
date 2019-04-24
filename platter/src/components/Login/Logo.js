import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput} from 'react-native';

export default class Logo extends Component {


render() {
	return (
	      <View style={styles.container}>
			<Image style={{width: 100, height : 100}} source={require('./platter.jpg')}/>
			<Text style={styles.logoText}>Welcome to Platter</Text>
		</View>
		)
}

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText: {
  	marginVertical: 15,
  	fontSize: 18,
  	color: 'rgba(255, 255, 255, 0.7)'
  }
  });