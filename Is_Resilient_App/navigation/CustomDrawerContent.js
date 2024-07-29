import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../config/firebase';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

const CustomDrawerContent = props => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('LogIn'); // Navigate to the login screen
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItem
          label="Home"
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
          onPress={() => props.navigation.navigate('Inventory')}
        />
        <DrawerItem
          label="Add Item"
          onPress={() => props.navigation.navigate('AddItem')}
        />
        <DrawerItem
          label="Take Item"
          onPress={() => props.navigation.navigate('TakeItem')}
        />

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
  drawerFooter: {
    marginTop: 'auto', // Push the footer to the bottom
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  logoutButton: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default CustomDrawerContent;
