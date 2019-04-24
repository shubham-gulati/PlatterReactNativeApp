import React from 'react';
import { FlatList, ActivityIndicator, Text, View ,StyleSheet, ListItem,TouchableOpacity, Image, Button} from 'react-native';

class BlinkingText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};
 
    // Change the state every second 
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 
    // Define any blinking time.
    1500);
  }
 
  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text style = {{ fontWeight: 'bold', fontSize : 20 , marginTop : 10 , alignItems: 'center'}}>{display}</Text>
    );
  }
}

export default class Deal extends React.Component {

  constructor() {
	  super();
	  this.state={
	    email:'',
	    res_id:''
	  }
	}

//pass the code generated to next screen or we can show a popup on the same screen
  componentDidMount() {
    console.warn("in componentDidMount");
    console.warn(this.props);

    this.setState({
      email: this.props.navigation.state.params.email,
      res_id: this.props.navigation.state.params.res_id
    });
  }

goToVisitCode = (visit_code) => {
    this.props.navigation.navigate("VisitCode", {visit_code: visit_code});
  }

async submit() {
  console.warn("in submit");
  console.warn(this.state);

  try {
   let response = await fetch('http://ec2-18-188-129-136.us-east-2.compute.amazonaws.com:3000/api/v1/visitUnlock',{
      // let response = await fetch("http://localhost:3000/api/v1/login", {
        method: 'POST',
        body: JSON.stringify({
          user : {
            email : this.state.email,
            res_id : this.state.res_id
          }
        }),
        
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    });
  
    let res = await response.text();
    console.warn("res is :"+res);
    var JSONObject = JSON.parse(res);

    if (JSONObject['status'] == 200) {
      //take to visit unlock page from here
      console.warn(res);

    } else {
      Alert.alert(
        'Some error occurred',
        'Please try again',
        [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
      );
      let errors = res;
      throw errors;
    }

  } catch(errors) {

  }
}

  render() {
    return(
      <View style={styles.container}>
      <View style={{height: 150, alignItems:'center', justifyContent:'center'}}>
          <Image source={require('./../Login/platter.jpg')} style={{height:120, width:120, borderRadius:60}}/>
      </View>
      <View style={{alignItems:'center'}}>
        <BlinkingText text='Buy 1 Get 1'/>
        <BlinkingText text='Just one click and unlock the deal'/>
    </View>
      <View style={{alignItems:'center'}}>
        <Button onPress={() => this.submit()} title="Learn More" color="#841584"
  accessibilityLabel="Unlock the Deal"/>
      </View>
    </View>
    );
  }



}

const styles = StyleSheet.create({
   container: {
    flex:1,
    backgroundColor: "#5d6066",
    justifyContent: 'center'
  },
  
  image : {
    marginTop: 50
  },
  
  bottom:{
  	flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
});