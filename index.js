/**
 * @format
 */
import { NativeAppEventEmiter } from 'react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import Login from './src/components/Login/Login.js';
import Restaurant from './src/components/Restaurant/restaurant.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
