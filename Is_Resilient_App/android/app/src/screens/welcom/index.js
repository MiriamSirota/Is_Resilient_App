import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text1}> Let's Get Started!</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../../assets/images/welcome.jpg')}
            style={styles.image}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}> Sign up </Text>
          </TouchableOpacity>
          <View style={styles.container2}>
            <Text style={styles.text3}> Already have an acount?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
              <Text style={styles.logInText}> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d7178',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    color: 'grey',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text3: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 100,
  },
  imageContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -60,
  },
  image: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 11,
    borderRadius: 100,
    bottom: -130,
  },
  buttonText: {
    color: 'gray',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  container2: {
    //"already have an accout"
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //position: 'absolute',
    bottom: -130,
  },
  logInText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#3a4245',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 100,
    marginLeft: 1,
  },
});
