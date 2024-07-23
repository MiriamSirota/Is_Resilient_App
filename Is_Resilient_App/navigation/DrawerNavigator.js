// navigation/DrawerNavigator.js
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../android/app/src/screens/HomeScreen';
import Settings from '../android/app/src/screens/Settings';
import Requests from '../android/app/src/screens/Requests';
import Inventory from '../android/app/src/screens/Inventory';
import AddItem from '../android/app/src/screens/Inventory/AddItem';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Requests" component={Requests} />
      <Drawer.Screen name="Inventory" component={Inventory} />
      <Drawer.Screen name="AddItem" component={AddItem} />
    </Drawer.Navigator>
  );
}
