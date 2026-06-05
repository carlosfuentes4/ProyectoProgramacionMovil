import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{headerShown: false}} 
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{headerShown: false}} 
      />
    </Stack.Navigator>
  );
}

