import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

export default function CreateEventScreen() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      // Reset the form fields whenever the screen is focused
      setName('');
      setLocation('');
      setTime('');
      setDate('');
    }, [])
  );

  const handleCreateEvent = async () => {
    try {
      if (name === '' || location === '' || time === '' || date === '') {
        Alert.alert('Error', 'All fields are required!');
        return;
      }

      await firestore().collection('events').add({
        name,
        location,
        time,
        date,
      });

      Alert.alert('Success', 'Event created successfully!');
      navigation.goBack(); // Go back to the previous screen, which resets the state when the screen is re-entered
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert(
        'Error',
        'There was a problem creating the event. Please try again.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />
      <Text style={styles.label}>Time</Text>
      <TextInput style={styles.input} value={time} onChangeText={setTime} />
      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} />
      <Button title="Create Event" onPress={handleCreateEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
