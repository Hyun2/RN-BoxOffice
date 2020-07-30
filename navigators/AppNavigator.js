import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BoxOfficeNavigator from './BoxOfficeNavigator';
import SearchNavigator from './SearchNavigator';

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen options={{ drawerLabel: "영화 검색" }} name="SearchNavigator" component={SearchNavigator} />
      <Drawer.Screen options={{ drawerLabel: "박스 오피스" }} name="BoxOfficeNavigator" component={BoxOfficeNavigator} />
    </Drawer.Navigator>
  )
}