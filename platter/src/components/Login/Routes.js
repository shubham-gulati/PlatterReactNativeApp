import React, {Component} from 'react';

import {Router, Stack, Scene} from 'react-native-router-flux';


import Login from './Login.js';
import Signup from './signup.js';


export default class RouterPlatter extends Component <{}> {
	render(){
		return(
			<Router>
    			<Stack key="root" hideNavBar={true}>
      				<Scene key="login" component={Login} title="Login" initial={true}/>
      				<Scene key="signup" component={Signup} title="Register"/>
    			</Stack>
  			</Router>
		)
	}
}