import React from 'react';
import { FlatList, ActivityIndicator, Text, View ,StyleSheet, ListItem,TouchableOpacity, Image} from 'react-native';

export default class VisitCode extends React.Component {

 constructor() {
	  super();
	  this.state={
	  	visitCode:'',
      email:'',
      res_id:'',
      image_url:'',
      timeCurrent: '',
      date: ''
	  }
	}

  componentDidMount() {
    var currDate = new Date();
    var timeCurr = currDate.getHours() + ":" + currDate.getMinutes() + ":" + currDate.getSeconds();
    var dd = String(currDate.getDate());
    var mm = String(currDate.getMonth() + 1); //January is 0!
    var yyyy = currDate.getFullYear();

    this.setState({
      visit_code: this.props.navigation.state.params.visit_code,
      email: this.props.navigation.state.params.email,
      res_id: this.props.navigation.state.params.res_id,
      image_url: this.props.navigation.state.params.image_url,
      timeCurrent: timeCurr,
      date: mm+"/"+dd+"/"+yyyy
    });
    //console.warn(this.state);
  }

//get the unlock code from previous screen and show it here
render() {
    return(
      <View style={styles.container}>
     <View style={{height: 200, alignItems:'center', justifyContent:'center'}}>
          <Image source={{uri: this.state.image_url}} style={{height:200, width:200}}/>
      </View>
      	<View style={styles.contain}>
          <Text style = {{ fontWeight: 'bold', fontSize : 20 , marginTop : 10 , alignItems: 'center', textAlign: 'center',
}}>Please Show this code to your server</Text>
        </View>
        <View style={styles.contain}>
          <Text style = {{ fontWeight: 'bold', fontSize : 20 , marginTop : 10 , alignItems: 'center', justifyContent:'center',     textAlign: 'center',
}}>VISIT ID is {this.state.visit_code}</Text>
          <Text style = {{ fontWeight: 'bold', fontSize : 20 , marginTop : 10 , alignItems: 'center', justifyContent:'center',     textAlign: 'center',
}}>Unlocked at {this.state.timeCurrent}</Text>
          <Text style = {{ fontWeight: 'bold', fontSize : 20 , marginTop : 10 , alignItems: 'center', justifyContent:'center',     textAlign: 'center',
}}>{this.state.date}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   
   container: {
    backgroundColor: "#D3D3D3",
    justifyContent: 'center',
    marginTop: 20,
    flex:1
  },

  contain: {
      marginTop:10,
     justifyContent: 'center'
  },
  
  image : {
    borderRadius: 30
  },
  
  bottom:{
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    alignItems: 'center'
  }
});