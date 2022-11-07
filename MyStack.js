import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import SignUp from './SignUp';
import TodoHome from './TodoHome';
import AddTodo from './AddTodo';


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}/>
        <Stack.Screen
            name="SignUp" 
            component={SignUp} 
            options = {{title: 'Sign Up'}}/>
      <Stack.Screen
            name="AddTodo" 
            component={AddTodo} 
            options = {{title: 'AddTodo'}}/>
            
      <Stack.Screen
            name="TodoHome" 
            component={TodoHome} 
            options = {{title: 'TodoHome'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;