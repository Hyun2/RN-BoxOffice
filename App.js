/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BoxOffice from './pages/BoxOffice';

const Stack = createStackNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: '#ffffff'
  },
};

const App: () => React$Node = () => {
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator>
        <Stack.Screen name="BoxOffice" options={{ headerShown: false }} component={BoxOffice} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
