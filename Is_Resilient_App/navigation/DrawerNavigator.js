// navigation/DrawerNavigator.js
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../android/app/src/screens/HomeScreen';
import Settings from '../android/app/src/screens/Settings';
import Requests from '../android/app/src/screens/Requests';
import Inventory from '../android/app/src/screens/Inventory';
import AddItem from '../android/app/src/screens/Inventory/AddItem';
import CustomDrawerContent from '../navigation/CustomDrawerContent';
import TakeItem from '../android/app/src/screens/Inventory/TakeItem';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Requests" component={Requests} />
      <Drawer.Screen name="Inventory" component={Inventory} />
      <Drawer.Screen name="AddItem" component={AddItem} />
      <Drawer.Screen name="TakeItem" component={TakeItem} />
    </Drawer.Navigator>
  );
}
