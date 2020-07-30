import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BoxOffice from '../pages/BoxOffice';
import MovieDetail from '../pages/MovieDetail';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BoxOffice" component={BoxOffice} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  )
}