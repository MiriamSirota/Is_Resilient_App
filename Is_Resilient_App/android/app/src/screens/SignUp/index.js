import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import React, { useState }  from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon, Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import { auth } from '../../../../../config/firebase';

export default function SignUp() {
  const navigation = useNavigation();

  // State management for each input field
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Create a new user with email and password
      await auth().createUserWithEmailAndPassword(email, password);
      // Optionally, you can update the user's profile with the full name
      const user = auth().currentUser;
      await user.updateProfile({
        displayName: fullName
      });

      // Notify the user of successful sign-up
      Alert.alert('Success', 'Account created successfully');
      // Navigate to the login screen or home screen
      navigation.navigate('LogIn'); // Adjust as needed
    } catch (error) {
      // Handle errors (e.g., email already in use)
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'This email address is already in use');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email address');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'Password should be at least 6 characters');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              type="font-awesome"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
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
            value={fullName}
            onChangeText={setFullName} // Update state on change
            placeholder="Enter Name"
          />
          <Text style={styles.text}>Email Address</Text>
          <TextInput
            style={styles.box}
            value={email}
            onChangeText={setEmail} // Update state on change
            placeholder="Enter Email"
            keyboardType="email-address"
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.box}
            secureTextEntry
            value={password}
            onChangeText={setPassword} // Update state on change
            placeholder="Enter Password"
          />
          
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text> Sign Up </Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.container3}>
          <Text style={styles.text3}> Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.logInText}> Log In</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#417e96',
  },
  container2: {
    backgroundColor: 'white',
    paddingHorizontal: 45,
    paddingTop: 8,
    width: '100%',
    height: '80%',
    bottom: -20,
    borderRadius: 20, // Adjust this value to control the roundness
    borderWidth: 1, // Optional: to see the border clearly
  },
  container3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    marginBottom: 10, // Adds spacing between the boxes
  },
  text3: {
    color: 'black',
    fontSize: 16,
    marginRight: 10, // Adds spacing between the text elements
  },
  image: {
    width: '85%',
    height: 170,
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#e3e5e8',
    borderRadius: 10, // Adjust this value to control the roundness
    marginBottom: 16, // Adds spacing between the boxes
    paddingHorizontal: 10, // Add padding for better text visibility
    height: 40, // Adjust height as needed
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    borderRadius: 100,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'gray',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logInText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#3a4245',
    paddingVertical: 10,
  },
});