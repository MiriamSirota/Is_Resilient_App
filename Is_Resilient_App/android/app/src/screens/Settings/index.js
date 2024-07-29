import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../.././../../../config/firebase';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Settings() {
  const navigation = useNavigation();
  const user = auth().currentUser;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        console.log('Authenticated User UID:', user.uid); // Debug log
        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            console.log('User Data:', userData); // Debug log
            setName(userData.name);
            setEmail(user.email);
          } else {
            Alert.alert('Error', 'User not found');
          }
        } catch (error) {
          console.error('Error fetching user details:', error); // Debug log
          Alert.alert('Error', 'Could not fetch user details');
        }
      } else {
        Alert.alert('Error', 'No authenticated user');
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleSaveChanges = async () => {
    try {
      if (email !== user.email) {
        await user.updateEmail(email);
      }
      if (password) {
        await user.updatePassword(password);
      }
      await firestore().collection('users').doc(user.uid).update({ name });
      Alert.alert('Success', 'User details updated');
    } catch (error) {
      console.error('Error updating user details:', error); // Debug log
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <Image
            source={require('../../../../../assets/images/profile.png')}
            style={styles.image}
          />
        </View>
      </SafeAreaView>
      <View style={styles.container2}>
        <View>
          <Text style={styles.text}>Full Name</Text>
          <TextInput
            style={styles.box}
            value={name}
            onChangeText={setName}
            placeholder="Change Name"
          />
          <Text style={styles.text}>Email Address</Text>
          <TextInput
            style={styles.box}
            value={email}
            onChangeText={setEmail}
            placeholder="Change Email"
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.box}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Change Password"
          />

          <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
            <Text> Save Changes </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  container2: {
    marginTop: 20,
  },
  box: {
    borderBottomWidth: 1,
    padding: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});
