import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon, Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {auth, firestore} from '../../../../../config/firebase';

export default function SignUp() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const trimmedEmail = email.trim(); // Trim whitespace from the email

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        trimmedEmail,
        password,
      );
      const user = userCredential.user;

      await user.updateProfile({
        displayName: fullName,
      });

      await firestore().collection('users').doc(user.uid).set({
        name: fullName,
        email: trimmedEmail,
      });

      await firestore().collection('roles').doc(user.uid).set({
        role: 'user', // Default role
      });

      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('LogIn');
    } catch (error) {
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
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-left"
                  type="font-awesome"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../../../assets/images/profile1.png')}
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
                onChangeText={setFullName}
                placeholder="Enter Name"
              />
              <Text style={styles.text}>Email Address</Text>
              <TextInput
                style={styles.box}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={styles.text}>Password</Text>
              <TextInput
                style={styles.box}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Password"
              />
              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.text4}> Sign Up </Text>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d7178',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    flexDirection: 'column', // Column layout to stack elements vertically
    justifyContent: 'center', // Center elements vertically
    alignItems: 'center', // Center elements horizontally
    width: '100%', // Ensure container takes full width
    height: 200, // Set a fixed height to ensure centering
  },
  image: {
    width: 170,
    height: 170,
    resizeMode: 'contain', // Ensures the image maintains aspect ratio
  },
  container2: {
    backgroundColor: 'white',
    paddingHorizontal: 45,
    paddingTop: 8,
    width: '100%',
    height: '80%',
    bottom: -20,
    borderRadius: 20,
    borderWidth: 1,
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
    marginBottom: 10,
  },
  text3: {
    color: 'black',
    fontSize: 16,
    marginRight: 10,
  },
  text4: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  box: {
    backgroundColor: '#e3e5e8',
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
    height: 40,
  },
  button: {
    backgroundColor: '#0d7178',
    paddingVertical: 10,
    borderRadius: 100,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffff',
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
