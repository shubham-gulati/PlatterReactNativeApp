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
  ScrollView,
  Dimensions,
  AsyncStorage
} from "react-native";

import { createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation";
import {DrawerNavigator, createDrawerNavigator, DrawerItems, TabNavigator} from 'react-navigation';
import {Header,Left, Right} from 'native-base';
import CustomHeader from "./src/components/Restaurant/customHeader.js";
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/Ionicons';

var NativeAppEventEmitter = require('RCTNativeAppEventEmitter');
import Deal from "./src/components/Restaurant/deal.js";
import VisitCode from "./src/components/Restaurant/visitCode.js";
import Restaurant from "./src/components/Restaurant/restaurant.js";
import HistoryVisits from "./src/components/Restaurant/history.js";
import UserProfile from "./src/components/Restaurant/userProfile.js";
import Login from "./src/components/Login/Login.js";
import Signup from "./src/components/Login/signup.js";
import SplashScreen from "./src/components/Restaurant/SplashScreen";
import Payment from "./src/components/Restaurant/paymentScreen.js";
import Logout from "./src/components/Login/logout.js";
import { StackNavigator } from "react-navigation";
const ACCESS_TOKEN = 'access_token';

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex:1}}>
    <View style={{height: 150, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
      <Image source={require('./src/components/Login/platter.jpg')} style={{height:120, width:120, borderRadius:60}}/>
    </View>
    <ScrollView> 
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)

const DrawerScreens = createDrawerNavigator({
   Restaurant: {screen: Restaurant},
   History: {screen: HistoryVisits},
   UserProfile: {screen: UserProfile},
   Payment: {screen: Payment},
   Logout: {screen: Logout}
}, {
  contentComponent :CustomDrawerComponent
});



const RouterPlatter = createStackNavigator({
    DrawerScreens: { screen: DrawerScreens},
    Restaurant: {screen: Restaurant},
    Payment: {screen: Payment},
    Deal: {screen: Deal},
    VisitCode: {screen: VisitCode}
  },
  {
    navigationOptions: {header:null, gesturesEnabled: false}
  });

const TabNavigatorSample = createBottomTabNavigator({
   Restaurant: {screen: RouterPlatter, navigationOptions: {
        tabBarLabel:"Restaurant",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={30} color="#42e2f4" />
        )
      }},
   History: {screen: HistoryVisits, navigationOptions: {
        tabBarLabel:"History",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="history" size={30} color="#42e2f4" />
        )
      }},
   UserProfile: {screen: UserProfile, navigationOptions: {
        tabBarLabel:"Profile Page",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="users" size={30} color="#42e2f4" />
        )
      }},
});

const MainNavigator = createStackNavigator({
   SplashScreen: { screen: SplashScreen },
   Login: { screen: Login },
   Signup: { screen: Signup },
   tabs: {screen: TabNavigatorSample},
   DrawerScreens: { screen: DrawerScreens}
}, {
   navigationOptions: {header: null, gesturesEnabled: false}
});

export default class App extends Component<{}> {
  
  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#F5FCFF"
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"  
  },  
  logo: {
    width: 128,
    height: 56
  },
  title: {
    color: "#f7c744",
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.9
  },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 200
  },
  input: {
    height: 40,
    margin: 20,
    backgroundColor: "grey"
  }
});
