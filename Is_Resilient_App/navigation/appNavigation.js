import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../android/app/src/screens/welcom';
import LogIn from '../android/app/src/screens/LogIn';
import SignUp from '../android/app/src/screens/SignUp';
import HomeScreen from '../android/app/src/screens/HomeScreen';
import DrawerNavigator from '../navigation/DrawerNavigator';
import Settings from '../android/app/src/screens/Settings';
import Inventory from '../android/app/src/screens/Inventory';
import AddItem from '../android/app/src/screens/Inventory/AddItem';
import Requests from '../android/app/src/screens/Requests';
import {auth} from '../config/firebase';
import CustomDrawerContent from './CustomDrawerContent';
import TakeItem from '../android/app/src/screens/Inventory/TakeItem';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setInitialRoute('DrawerNavigator');
      } else {
        setInitialRoute('Welcome');
      }
    });
    return () => unsubscribe();
  }, []);

  if (initialRoute === null) {
    return null; // or a loading indicator
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="Inventory"
          component={Inventory}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AddItem"
          component={AddItem}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TakeItem"
          component={TakeItem}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Requests"
          component={Requests}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CustomDrawerContent"
          component={CustomDrawerContent}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
