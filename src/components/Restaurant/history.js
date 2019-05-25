import React from 'react';
import { FlatList, ActivityIndicator, Text, View ,StyleSheet, ListItem,TouchableOpacity, Image} from 'react-native';
import { SearchBar } from "react-native-elements";
import {AsyncStorage} from 'react-native';
import MyHeader from "./customHeader";
const ACCESS_TOKEN = "access_token";
const EMAIL = "email_stored";
const MEMBER = "member";

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "blue" : "black";
    const addressColor = this.props.selected ? "blue" : "gray";
    return (
     <View style={{flex:1, flexDirection:'column'}}>
        <View style={{flex:1, flexDirection:'row', backgroundColor: "#F4EFC6"}}>
          <Image source={{uri: this.props.imageUrl}} style={{width:100, height:100,margin:5}}>
          </Image>

          <View style={{flex:1, flexDirection:'column'}}>
            <TouchableOpacity
              onPress={this._onPress}
              style={{ padding: 15}}>
              <View>
                <Text
                  style={{
                    color: textColor,
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingBottom: 15
                  }}>
                  {this.props.name}
                </Text>
              </View>
              <View>
                <Text style={{ color: addressColor }}>{this.props.address}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height:1, backgroundColor:'white'}}>
        </View>
      </View>
    );
  }
}

class MultiSelectList extends React.PureComponent {
  state = { selected: (new Map(): Map<string, boolean>) };

  _keyExtractor = (item, index) => `${item.res_id}`;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _renderItem = ({ item }) => (
    <MyListItem
      id={item.res_id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.res_id)}
      name={item.name}
      address={item.address}
      imageUrl={item.image_url}/>
  );

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}/>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this.renderSeparator}/>
    );
  }
}

export default class HistoryVisits extends React.Component {

  constructor(props) {
    super(props);
    this.state ={isLoading: true, dataSource: [], data: [], email:'', savings:0, is_member:''}
  }

  async componentDidMount() {
    let email = "";
    let member = "";
       
     try {
        email = await AsyncStorage.getItem(EMAIL);
        member = await AsyncStorage.getItem(MEMBER);
      } catch (error) {
         console.warn("Something went wrong get");
      }

      email = email.replace(/\"/g, "");

      //console.warn("email is");
      //console.warn(email);
      this.setState({
        email:email,
        member:member
      });

       return fetch(`http://ec2-18-188-129-136.us-east-2.compute.amazonaws.com:3000/api/v1/history?email=${this.state.email}`, {
          method: "GET"
      })
      .then((response) => response.json())
      .then((responseJson) => {

        let length = 0;
        if (responseJson.results != undefined) {
          length = responseJson.results.length;
        }

        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
          savings: length,
          data: responseJson.results
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){
    const result = (this.state.savings)*5;
    if (this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    // let t;
    
    // if (this.state.is_member) {
    //   t =  <Text style={styles.textStyle}>Your savings till now are ${result}</Text>;
    // } else {
    //   t =  <Text style={styles.textStyle}>You are not a Platter Member yet.</Text>;
    // }

    return(
      <View style={styles.container}>
        <MyHeader navigation={this.props.navigation} title="History" />
        <MultiSelectList 
        data={this.state.dataSource}
        value={this.state.value}/>
        <View style={styles.bottomView}>
          <Text style={styles.textStyle}>Your savings till now are ${result}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
    height: "100%",
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
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
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#f4eb42',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    color: '#f47441',
    fontSize: 18,
  },
});
