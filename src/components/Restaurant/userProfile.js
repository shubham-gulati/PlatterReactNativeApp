import React from 'react';
import { FlatList, ActivityIndicator, Text, View ,StyleSheet, ListItem,TouchableOpacity, Image} from 'react-native';
import { SearchBar } from "react-native-elements";
import MyHeader from './customHeader.js';
import {AsyncStorage} from 'react-native';
const EMAIL = "email_stored";


export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state ={isLoading: true, name:'', email: '', mobile:''}
  }
  
  async componentDidMount() {

      let email = "";
       
     try {
        email = await AsyncStorage.getItem(EMAIL);
      } catch (error) {
         console.warn("Something went wrong get");
      }

      email = email.replace(/\"/g, "");

      
      this.setState({
        email:email
      });

     //return fetch(url)
      return fetch(`http://ec2-18-188-129-136.us-east-2.compute.amazonaws.com:3000/api/v1/userDetails?email=${this.state.email}`, {
          method: "GET"
      })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          name: responseJson.results[0]['name'],
          mobile: responseJson.results[0]['mobile_number']
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  };
  
  render() {
    
    // if (this.state.isLoading) {
    //   return(
    //     <View style={{flex: 1, padding: 20}}>
    //       <ActivityIndicator/>
    //     </View>
    //   )
    // }

    return(
      <View style={styles.container}>
        <MyHeader navigation={this.props.navigation} title="Profile" />
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

                <Text style={styles.name}>{this.state.name}</Text>
                <Text style={styles.userInfo}>{this.state.email}</Text>
                <Text style={styles.userInfo}>{this.state.mobile}</Text>
                 
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.name}>Platter MemberShip</Text>
          </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: 50,
    backgroundColor: "#F5FCFF",
    alignItems: 'center'
  },
  title: {
    color: '#f7c744',
    fontSize: 10,
    marginTop: 5,
    opacity: 0.9
  },
  infoContainer: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    paddingVertical: 15
  },
  input : {
    height: 40,
    margin: 20,
    backgroundColor: 'grey'
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
  header:{
    backgroundColor: "#DCDCDC",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10
  }, 
  name: {
    fontSize:22,
    color:"#000000",
    fontWeight:'600'
  },
  userInfo: {
    fontSize:16,
    color:"#778899",
    fontWeight:'600'
  }
});
