import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert, Text} from 'react-native';
import {firestore} from '../../../../../config/firebase';
import {Picker} from '@react-native-picker/picker';

const AddItemScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('One size');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');

  const handleAddItem = async () => {
    if (!name || !amount || !location) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      await firestore()
        .collection('inventory')
        .add({
          name,
          size,
          amount: Number(amount), // Convert amount to number
          location,
        });
      Alert.alert('Success', 'Item added to inventory');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not add item');
    }
  };

  // Define background colors for each item
  const backgroundColors = ['#ADD8E6', '#87CEEB', '#B0E0E6']; // Light blue shades

  return (
    <View style={styles.container}>
      <View
        style={[styles.inputContainer, {backgroundColor: backgroundColors[0]}]}>
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          placeholder="Item Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>
      <View
        style={[styles.inputContainer, {backgroundColor: backgroundColors[1]}]}>
        <Text style={styles.label}>Size</Text>
        <Picker
          selectedValue={size}
          style={styles.picker}
          onValueChange={itemValue => setSize(itemValue)}>
          <Picker.Item label="One size" value="One size" />
          <Picker.Item label="S" value="S" />
          <Picker.Item label="M" value="M" />
          <Picker.Item label="L" value="L" />
          <Picker.Item label="XL" value="XL" />
        </Picker>
      </View>
      <View
        style={[styles.inputContainer, {backgroundColor: backgroundColors[2]}]}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={text => setAmount(text.replace(/[^0-9]/g, ''))} // Allow only numbers
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
      <View
        style={[styles.inputContainer, {backgroundColor: backgroundColors[0]}]}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />
      </View>
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  input: {
    borderBottomWidth: 1,
    padding: 8,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AddItemScreen;
