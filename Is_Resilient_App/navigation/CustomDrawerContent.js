import React from 'react';
<<<<<<< HEAD
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../config/firebase';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useAuth} from '../android/app/src/context/AuthContext';
=======
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../config/firebase';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
>>>>>>> MiriamSirota/main

const CustomDrawerContent = props => {
  const navigation = useNavigation();

<<<<<<< HEAD
  const {handleLogout} = useAuth();
=======
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('LogIn'); // Navigate to the login screen
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
>>>>>>> MiriamSirota/main

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItem
          label="Home"
<<<<<<< HEAD
          icon={() => (
            <Image
              source={require('../assets/images/home_icon.jpg')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label="My Space"
          icon={() => (
            <Image
              source={require('../assets/images/profile.png')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('MySpace')}
        />

        <DrawerItem
          label="Requests"
          icon={() => (
            <Image
              source={require('../assets/images/chat_icon.jpg')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('Requests')}
        />

        <DrawerItem
          label="Create Event"
          icon={() => (
            <Image
              source={require('../assets/images/event_black_icon.jpg')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('CreateEvent')}
        />

        <DrawerItem
          label="Inventory"
          icon={() => (
            <Image
              source={require('../assets/images/inventory1.png')}
              style={styles.iconImage}
            />
          )}
=======
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label="Settings"
          onPress={() => props.navigation.navigate('Settings')}
        />
        <DrawerItem
          label="Requests"
          onPress={() => props.navigation.navigate('Requests')}
        />
        <DrawerItem
          label="Inventory"
>>>>>>> MiriamSirota/main
          onPress={() => props.navigation.navigate('Inventory')}
        />
        <DrawerItem
          label="Add Item"
<<<<<<< HEAD
          icon={() => (
            <Image
              source={require('../assets/images/additem1.jpg')}
              style={styles.iconImage}
            />
          )}
=======
>>>>>>> MiriamSirota/main
          onPress={() => props.navigation.navigate('AddItem')}
        />
        <DrawerItem
          label="Take Item"
<<<<<<< HEAD
          icon={() => (
            <Image
              source={require('../assets/images/takeitem1.jpg')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('TakeItem')}
        />

        <DrawerItem
          label="Settings"
          icon={() => (
            <Image
              source={require('../assets/images/settings_icon.jpg')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('Settings')}
        />

=======
          onPress={() => props.navigation.navigate('TakeItem')}
        />

>>>>>>> MiriamSirota/main
        <View style={styles.drawerFooter}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
<<<<<<< HEAD
  iconImage: {
    width: 24, // Set appropriate width for the icon image
    height: 24, // Set appropriate height for the icon image
    marginRight: -20, // Adjust this to better position the icon
  },
  drawerFooter: {
    marginTop: 'auto', // Push the footer to the bottom
    padding: 40,
=======
  drawerFooter: {
    marginTop: 'auto', // Push the footer to the bottom
    padding: 20,
>>>>>>> MiriamSirota/main
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  logoutButton: {
<<<<<<< HEAD
    //backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 10,
=======
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
>>>>>>> MiriamSirota/main
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
<<<<<<< HEAD
    color: 'black',
=======
    color: 'white',
    textAlign: 'center',
>>>>>>> MiriamSirota/main
  },
});

export default CustomDrawerContent;
