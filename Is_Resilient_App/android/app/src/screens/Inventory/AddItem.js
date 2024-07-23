import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {firestore} from '../../../../../config/firebase';

const AddItemScreen = ({navigation}) => {
  const [productName, setProductName] = useState('');
  const [size, setSize] = useState('');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [catagory, setCatagory] = useState('');

  const handleAddItem = async () => {
    try {
      await firestore().collection('inventory').add({
        'product name': productName,
        size,
        amount,
        location,
        catagory,
      });
      Alert.alert('Success', 'Item added to inventory');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not add item');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
      />
      <TextInput
        placeholder="Size"
        value={size}
        onChangeText={setSize}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={catagory}
        onChangeText={setCatagory}
        style={styles.input}
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default AddItemScreen;
