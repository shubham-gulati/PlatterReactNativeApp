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

// react-navigation uses createStackNavigator
// createStackNavigor takes 2 objects: screens and options
const DrawerScreens = createDrawerNavigator({
   Restaurants: {screen: Restaurant},
   History: {screen: HistoryVisits},
   UserProfile: {screen: UserProfile}
}, {
  contentComponent :CustomDrawerComponent
});

const RouterPlatter = createStackNavigator({
    DrawerScreens: { screen: DrawerScreens},
    Restaurant: {screen: Restaurant},
    Deal: {screen: Deal},
    VisitCode: {screen: VisitCode}
  },
  {
    // header is set to null in order to hide the header
    navigationOptions: {header:null}
  });

const TabNavigatorSample = createBottomTabNavigator({
   Restaurant: RouterPlatter,
   History: {screen: HistoryVisits},
   UserProfile: {screen: UserProfile},
});

const MainNavigator = createStackNavigator({
   SplashScreen: { screen: SplashScreen },
   Login: { screen: Login },
   Signup: { screen: Signup },
   tabs: {screen: TabNavigatorSample},
    DrawerScreens: { screen: DrawerScreens }
}, {
   navigationOptions: {header: null} //gets rid of the white header
});

// const TabRouterPlatter = createStackNavigator({
//     // screens of the app,
//     // the first screen on the list will show up first
//     // TabScreens: {screen: TabScreens},
//     DrawerScreens: { screen: DrawerScreens },
//     Restaurants: {screen: Restaurant},
//     Deal: {screen: Deal},
//     VisitCode: {screen: VisitCode}
//     // Restaurant: {screen: Restaurant}
//   },
//   {
//     // header is set to null in order to hide the header
//     navigationOptions: {header:null}
//   });




// const MainNavigator = createBottomTabNavigator({
//    Restaurant: RouterPlatter,
//    History: {screen: HistoryVisits},
//    UserProfile: {screen: UserProfile}
// });

export default class App extends Component<{}> {
  
  componentWillMount() {
    this.getToken();
  }

  async getToken() {
    try {
        let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
        if (!accessToken) {
            //navigate to login/signup screen
        } else {
          //navigate to restaurant screen
        }
    } catch(error) {
        console.log("Something Went Wrong");
    }
  }

  render() {
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
