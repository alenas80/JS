import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './AppNavigator/AuthNavigator/AuthScreen';
import RegisterScreen from './AppNavigator/AuthNavigator/RegisterScreen';
import LoginScreen from './AppNavigator/AuthNavigator/LoginScreen';
import HomeScreen from './AppNavigator/MainNavigator/HomeStack/HomeScreen';
import DetailsScreen from './AppNavigator/MainNavigator/HomeStack/DetailsScreen';
import ProfileScreen from './AppNavigator/MainNavigator/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Auth' component={AuthScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Details' component={DetailsScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

