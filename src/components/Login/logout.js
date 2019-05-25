import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import {AsyncStorage} from 'react-native';
import Login from "./Login.js";
import { StackActions, NavigationActions } from 'react-navigation';
//import AsyncStorage from '@react-native-community/async-storage';

const ACCESS_TOKEN = "access_token";
const EMAIL = "email_stored";
const MEMBER = "member";

 const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
 });

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    async clear() {
        let keys = [ACCESS_TOKEN, EMAIL, MEMBER];
        await AsyncStorage.multiRemove(keys, (err) => {
            console.warn("removed");
            let token = AsyncStorage.getItem(ACCESS_TOKEN);
            let email = AsyncStorage.getItem(EMAIL);
            console.warn(token);
            console.warn(email);
        });
    }

    async componentWillMount() {
        console.warn("clearing Async Storage");
        this.clear();
        let token = await AsyncStorage.getItem(ACCESS_TOKEN);
        let email = await AsyncStorage.getItem(EMAIL);
        
        if (token != null) {
            console.warn("inside token");
            console.warn(token);
        }
        
        if (email != null) {
            console.warn("inside email");
            console.warn(email)
        }
    }


    componentDidMount=()=> {
        setTimeout(()=>{ this.props.navigation.navigate("Login"); }, 1000);
    }

    // componentDidMount=()=> {
    //     setTimeout(()=>{ this.props.navigation.dispatch(resetAction);}, 1000);
    // }

    render() {
     return <View></View>;
    }
}
