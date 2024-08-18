import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useAuth} from '../android/app/src/context/AuthContext';

const CustomDrawerContent = props => {
  const {handleLogout} = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItem
          label="Home"
          icon={() => (
            <Image
              source={require('../assets/images/home_icon.jpg')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('Home')}
        />

        <DrawerItem
          label="Inventory"
          icon={() => (
            <Image
              source={require('../assets/images/inventory1.png')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('Inventory')}
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
          label="Our History"
          icon={() => (
            <Image
              source={require('../assets/images/archive.png')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('MySpace')}
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
          label="Add Item"
          icon={() => (
            <Image
              source={require('../assets/images/additem1.jpg')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('AddItem')}
        />
        <DrawerItem
          label="Take Item"
          icon={() => (
            <Image
              source={require('../assets/images/takeitem1.jpg')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('TakeItem')}
        />

        <DrawerItem
          label="Profile"
          icon={() => (
            <Image
              source={require('../assets/images/profile_icon.png')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('Settings')}
        />

        <View style={styles.drawerFooter}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Image
              source={require('../assets/images/logout_icon.png')}
              style={styles.logoutIcon}
            />
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
  iconImage: {
    width: 24,
    height: 24,
  },
  drawerFooter: {
    marginTop: 'auto',
    paddingHorizontal: 20, // Match padding with other drawer items
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    marginRight: 32,
  },
  logoutText: {
    fontSize: 16,
    color: 'black',
  },
});

export default CustomDrawerContent;
