import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import login from './login';
import TabLayout from './(tabs)/_layout';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={login} />
      <Stack.Screen name="Main" component={TabLayout} />
    </Stack.Navigator>
  );
}
