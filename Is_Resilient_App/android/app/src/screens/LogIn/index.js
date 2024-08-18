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
import {useNavigation, CommonActions} from '@react-navigation/native';
import {auth} from '../.././../../../config/firebase';
import firestore from '@react-native-firebase/firestore';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    const trimmedEmail = email.trim(); // Trim whitespace from the email

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        trimmedEmail,
        password,
      );
      const user = userCredential.user;

      // Fetch additional user information from Firestore
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      if (!userDoc.exists) {
        Alert.alert('Error', 'User data not found in Firestore');
        return;
      }

      const userData = userDoc.data();
      console.log('User Data:', userData); // Debug log

      // Navigate to the DrawerNavigator after successful login and data fetching
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'DrawerNavigator'}],
        }),
      );
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', "You don't have an account. Please sign up.");
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
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../../../assets/images/login2.png')}
                style={styles.image}
              />
            </View>
          </SafeAreaView>
          <View style={styles.container2}>
            <View>
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
              <TouchableOpacity style={styles.forgot}>
                <Text>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.text4}>Log in</Text>
              </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.container3}>
              <Text style={styles.text3}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.logInText}>Sign up</Text>
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
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  container2: {
    backgroundColor: 'white',
    paddingHorizontal: 45,
    paddingTop: 8,
    width: '100%',
    height: '50%',
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
  forgot: {
    alignItems: 'flex-end',
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
    color: 'white',
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
