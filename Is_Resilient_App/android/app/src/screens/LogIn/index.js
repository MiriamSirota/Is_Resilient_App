import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon, Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

export default function LogIn() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
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
            source={require('../../../../../assets/images/unlock3.png')}
            style={styles.image}
          />
        </View>
      </SafeAreaView>
      <View style={styles.container2}>
        <View>
          <Text style={styles.text}>Email Address</Text>
          <TextInput
            style={styles.box}
            value="example@gmail.com"
            placeholder="Enter Email"
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.box}
            secureTextEntry
            value="test1234"
            placeholder="Enter Password"
          />
          <TouchableOpacity style={styles.forgot}>
            <Text> Forgot Password? </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text> Log in </Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.container3}>
          <Text style={styles.text3}> Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.logInText}> Sign up</Text>
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
    height: '50%',
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
    height: 270,
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#e3e5e8',
    borderRadius: 10, // Adjust this value to control the roundness
    marginBottom: 16, // Adds spacing between the boxes
  },
  forgot: {
    alignItems: 'flex-end',
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
