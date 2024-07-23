import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import {firestore} from '../../../../../config/firebase';

const InventoryScreen = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('inventory')
      .onSnapshot(
        snapshot => {
          if (snapshot) {
            const newItems = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log('Fetched items:', newItems); // Log items for debugging
            setItems(newItems);
          } else {
            console.error('Snapshot is null or undefined');
          }
        },
        error => {
          console.error('Error fetching snapshot: ', error);
          Alert.alert('Error', 'Failed to fetch inventory data');
        },
      );

    return () => unsubscribe();
  }, []);

  const filteredItems = items.filter(item =>
    (item['product name'] || '').toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search items"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      <Button
        title="Add Item"
        onPress={() => navigation.navigate('AddItem')}
        style={styles.addButton} 
      />
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>Product Name: {item['product name'] || 'N/A'}</Text>
            <Text>Size: {item.size || 'N/A'}</Text>
            <Text>Amount: {item.amount || 'N/A'}</Text>
            <Text>Location: {item.location || 'N/A'}</Text>
            <Text>Category: {item.catagory || 'N/A'}</Text>
          </View>
        )}
      />
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
  addButton: {
    marginBottom: 20, // Space between the button and the list
  },
  item: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 5,
  },
});

export default InventoryScreen;
