/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './Login';
import MyStack from './MyStack';
import {name as appName} from './app.json';
import AddTodo from './AddTodo';
import TodoHome from './TodoHome';

AppRegistry.registerComponent(appName, () => MyStack);
