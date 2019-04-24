import React from 'react';
import { FlatList, ActivityIndicator, Text, View ,StyleSheet, ListItem,TouchableOpacity, Image} from 'react-native';

export default class VisitCode extends React.Component {

 constructor() {
	  super();
	  this.state={
	  	visitCode:''
	  }
	}

  componentDidMount() {
    this.setState({
      visit_code: this.props.visit_code,
    });
  }

//get the unlock code from previous screen and show it here
render() {
    return(
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('./../Login/platter.jpg')}/>
      	<View style={styles.bottom}>
          <Text>68849</Text>
        </View>
      </View>
    );
  }
}