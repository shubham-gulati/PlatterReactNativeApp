import React from 'react';
import { FlatList, ActivityIndicator, Text, View ,StyleSheet, ListItem,TouchableOpacity, Image} from 'react-native';
import { SearchBar } from "react-native-elements";
import CustomHeader from './customHeader.js';

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
    this.props.goToDeal(this.props.id, this.props.name, 'sgulati3@buffalo.edu');
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
      imageUrl={item.image_url}
      goToDeal={this.props.goToDeal}/>
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

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.props.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.props.value}/>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}/>
    );
  }
}

export default class Restaurant extends React.Component {

  constructor(props){
    super(props);
    this.state ={isLoading: true, dataSource: [], data: []}
  }

  goToDeal = (res_id, name, email) => {
    this.props.navigation.navigate("Deal", {res_id: res_id, name: name, email: email});
  }

  searchFilterFunction = text => {
    this.setState({
      value: text
    });

    const newData = this.state.dataSource.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.name.toLowerCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    if (text.trim())
      this.setState({
        dataSource: newData //data: newData
      }); 
    else 
      this.setState({
      dataSource: this.state.data
    }); 
  };

  componentDidMount() {
    return fetch('http://ec2-18-188-129-136.us-east-2.compute.amazonaws.com:3000/api/v1/restaurants')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.response,
          data: responseJson.response
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if (this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        <MultiSelectList 
        data={this.state.dataSource} 
        searchFilterFunction={this.searchFilterFunction}
        value={this.state.value}
        goToDeal={this.goToDeal}/>
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
  }
});
