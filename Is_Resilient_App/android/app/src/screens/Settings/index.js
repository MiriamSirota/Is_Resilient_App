import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

export default function Settings() {
  const navigation = useNavigation();
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
            value="Israel Israeli"
            placeholder="change Name"
          />
          <Text style={styles.text}>Email Address</Text>
          <TextInput
            style={styles.box}
            value="example@gmail.com"
            // placeholder="Enter Email"
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.box}
            secureTextEntry
            value="test1234"
            placeholder="change Password"
          />

          <TouchableOpacity style={styles.button}>
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
    backgroundColor: 'white',
  },
  container2: {
    backgroundColor: 'white',
    paddingHorizontal: 45,
    paddingTop: 8,
    width: '100%',
    height: '80%',
    bottom: -20,
    borderRadius: 20, // Adjust this value to control the roundness
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
    width: '80',
    height: 250,
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#e3e5e8',
    borderRadius: 10, // Adjust this value to control the roundness
    marginBottom: 16, // Adds spacing between the boxes
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