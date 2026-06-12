import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailScreen';
import ManageRecipeScreen from '../screens/ManageRecipeScreen';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined; 
  Detail: { receta: any };
  ManageRecipe: { receta?: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="ManageRecipe" component={ManageRecipeScreen} />
    </Stack.Navigator>
  );
}

