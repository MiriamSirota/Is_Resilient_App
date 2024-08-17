import React, {useEffect, useState} from 'react';
<<<<<<< HEAD
=======
import {NavigationContainer} from '@react-navigation/native';
>>>>>>> MiriamSirota/main
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
<<<<<<< HEAD
import {firestore, auth} from '../config/firebase';
import CustomDrawerContent from './CustomDrawerContent';
import TakeItem from '../android/app/src/screens/Inventory/TakeItem';
import MySpace from '../android/app/src/screens/MySpace';
import CreateEventScreen from '../android/app/src/screens/CreateEvent';
=======
import {auth} from '../config/firebase';
import CustomDrawerContent from './CustomDrawerContent';
import TakeItem from '../android/app/src/screens/Inventory/TakeItem';
>>>>>>> MiriamSirota/main

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [initialRoute, setInitialRoute] = useState(null);
<<<<<<< HEAD
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = async user => {
      if (user) {
        const roleDoc = await firestore()
          .collection('roles')
          .doc(user.uid)
          .get();
        if (roleDoc.exists) {
          const userRole = roleDoc.data().role;
          setIsAdmin(userRole === 'admin');
        } else {
          setIsAdmin(false); // Explicitly set non-admin users
        }
      } else {
        setIsAdmin(false); // If no user, definitely not admin
      }
    };

    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        checkUserRole(user).then(() => {
          setInitialRoute('DrawerNavigator');
        });
=======

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setInitialRoute('DrawerNavigator');
>>>>>>> MiriamSirota/main
      } else {
        setInitialRoute('Welcome');
      }
    });
<<<<<<< HEAD

=======
>>>>>>> MiriamSirota/main
    return () => unsubscribe();
  }, []);

  if (initialRoute === null) {
    return null; // or a loading indicator
  }

  return (
<<<<<<< HEAD
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
        name="MySpace"
        component={MySpace}
        options={{headerShown: false}}
      />

      {isAdmin && (
        <Stack.Screen
          name="CreateEvent"
          component={CreateEventScreen}
          options={{headerShown: false}}
        />
      )}

      <Stack.Screen
        name="CustomDrawerContent"
        component={CustomDrawerContent}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
=======
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
>>>>>>> MiriamSirota/main
  );
}
