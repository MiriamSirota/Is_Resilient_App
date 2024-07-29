// TakeItemScreen.js
import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet, Alert, Text} from 'react-native';
import {firestore} from '../../../../../config/firebase';
import {Picker} from '@react-native-picker/picker';

const TakeItemScreen = ({navigation}) => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const snapshot = await firestore().collection('inventory').get();
        const items = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        console.log('Fetched items:', items); // Logging for debugging
        setInventory(items);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        Alert.alert('Error', 'Could not fetch inventory');
      }
    };

    fetchInventory();
  }, []);

  const handleTakeItem = async () => {
    if (!selectedItem || !amount) {
      Alert.alert('Error', 'Please select an item and enter the amount.');
      return;
    }

    const item = inventory.find(item => item.id === selectedItem);
    if (!item) {
      Alert.alert('Error', 'Selected item not found in inventory.');
      return;
    }

    if (Number(amount) > item.amount) {
      Alert.alert(
        'Error',
        'Cannot take more items than available in inventory.',
      );
      return;
    }

    try {
      await firestore()
        .collection('inventory')
        .doc(selectedItem)
        .update({
          amount: item.amount - Number(amount),
        });
      Alert.alert('Success', 'Inventory updated');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating inventory:', error);
      Alert.alert('Error', 'Could not update inventory');
    }
  };

  const backgroundColors = ['#ADD8E6', '#87CEEB', '#B0E0E6']; // Light blue shades

  return (
    <View style={styles.container}>
      <View
        style={[styles.inputContainer, {backgroundColor: backgroundColors[0]}]}>
        <Text style={styles.label}>Select Item</Text>
        <Picker
          selectedValue={selectedItem}
          style={styles.picker}
          onValueChange={itemValue => setSelectedItem(itemValue)}>
          <Picker.Item label="Select an item" value={null} />
          {inventory.map(item => (
            <Picker.Item
              key={item.id}
              label={`${item.name || 'Unnamed Item'} - ${
                item.size || 'One Size'
              }`}
              value={item.id}
            />
          ))}
        </Picker>
      </View>
      <View
        style={[styles.inputContainer, {backgroundColor: backgroundColors[1]}]}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={text => setAmount(text.replace(/[^0-9]/g, ''))} // Allow only numbers
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
      <Button title="Take Item" onPress={handleTakeItem} />
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

export default TakeItemScreen;
