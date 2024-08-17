import React from 'react';
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

const CustomDrawerContent = props => {
  const navigation = useNavigation();

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
          onPress={() => props.navigation.navigate('Inventory')}
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
          label="Settings"
          icon={() => (
            <Image
              source={require('../assets/images/settings_icon.jpg')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('Settings')}
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
  iconImage: {
    width: 24, // Set appropriate width for the icon image
    height: 24, // Set appropriate height for the icon image
    marginRight: -20, // Adjust this to better position the icon
  },
  drawerFooter: {
    marginTop: 'auto', // Push the footer to the bottom
    padding: 40,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  logoutButton: {
    //backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
    color: 'black',
  },
});

export default CustomDrawerContent;
