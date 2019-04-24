import React from 'react';
import { FlatList, ActivityIndicator, Text, View ,StyleSheet, ListItem,TouchableOpacity, Image} from 'react-native';
import { SearchBar } from "react-native-elements";


export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state ={isLoading: true, dataSource: []}
  }

  componentDidMount() {
    return fetch('http://ec2-18-188-129-136.us-east-2.compute.amazonaws.com:3000/api/v1/userDetails?email=sgulati3@buffalo.edu')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.results
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    
    if (this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

                <Text style={styles.name}>Shubham Gulati</Text>
                <Text style={styles.userInfo}>sgulati3@bufflo.edu</Text>
                <Text style={styles.userInfo}>7167481645</Text>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.name}>Platter MemberShip</Text>
            <Text style={styles.userInfo}>Expiring on 06/30/2019</Text>
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
    backgroundColor: "#F5FCFF"
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
