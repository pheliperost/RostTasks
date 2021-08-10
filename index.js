/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Navigator from  './src/Navigator'
import {name as appName} from './app.json'
import MyApp from './src/screens/Students'


AppRegistry.registerComponent(appName, () => Navigator );
