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
          icon={() => (
            <Image
              source={require('../../../../../assets/images/unlock3.png')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label="Settings"
          icon={() => (
            <Image
              source={require('../../../../../assets/images/unlock3.png')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('Settings')}
        />
        <DrawerItem
          label="Requests"
          icon={() => (
            <Image
              source={require('../../../../../assets/images/unlock3.png')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('Requests')}
        />
        <DrawerItem
          label="Inventory"
          icon={() => (
            <Image
              source={require('../../../../../assets/images/unlock3.png')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('Inventory')}
        />
        <DrawerItem
          label="Add Item"
          icon={() => (
            <Image
              source={require('../../../../../assets/images/additem.ico')}
              style={styles.iconImage}
            />
          )}
          onPress={() => props.navigation.navigate('AddItem')}
        />
        <DrawerItem
          label="Take Item"
          icon={() => (
            <Image
              source={require('../../../../../assets/images/takeitem1.jpg')}
              style={styles.iconImage}
            />
          )}
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
  iconImage: {
    width: 24, // Set appropriate width for the icon image
    height: 24, // Set appropriate height for the icon image
    marginRight: -20, // Adjust this to better position the icon
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
