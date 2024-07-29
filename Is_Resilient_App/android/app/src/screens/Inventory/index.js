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
import {SafeAreaView} from 'react-native-safe-area-context';

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
    (item['name'] || '').toLowerCase().includes(search.toLowerCase()),
  );

  // Define shades of light blue
  const shadesOfBlue = ['#d0e6f4', '#b3d7f3', '#9cc3f2'];

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search items"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      <Button
        title="Add Item"
        onPress={() => navigation.navigate('AddItem')}
        style={styles.addButton} // Add this line for styling
      />
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View
            style={[
              styles.item,
              {
                backgroundColor: shadesOfBlue[index % shadesOfBlue.length],
              },
            ]}>
            <Text style={styles.itemText}>
              Product Name: {item['name'] || ' '}
            </Text>
            <Text style={styles.itemText}>Size: {item.size || 'one size'}</Text>
            <Text style={styles.itemText}>Amount: {item.amount || ' '}</Text>
            <Text style={styles.itemText}>
              Location: {item.location || ' '}
            </Text>
            <Text style={styles.itemText}>
              Category: {item.catagory || ' '}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 90, //insures the last item doesnt get cut off buy the buttom header
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default InventoryScreen;
