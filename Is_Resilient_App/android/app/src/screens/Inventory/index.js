import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {firestore} from '../../../../../config/firebase';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from 'react-native-elements';

const categories = [
  {
    id: '1',
    name: 'Clothes',
    image: require('../../../../../assets/images/clothes.jpg'),
  },
  {
    id: '2',
    name: 'Outdoor Equipment',
    image: require('../../../../../assets/images/outdoor.jpg'),
  },
  {
    id: '3',
    name: 'Electronics',
    image: require('../../../../../assets/images/electrisity.jpg'),
  },
  {
    id: '4',
    name: 'Protective gear',
    image: require('../../../../../assets/images/protective.jpg'),
  },
  {
    id: '5',
    name: 'Medical',
    image: require('../../../../../assets/images/medical1.jpg'),
  },
  {
    id: '6',
    name: 'Others',
    image: require('../../../../../assets/images/other_icon.png'),
  },
];

const InventoryScreen = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [viewOption, setViewOption] = useState('category'); // Default view option
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('inventory')
      .onSnapshot(
        snapshot => {
          if (snapshot) {
            const newItems = snapshot.docs.map(doc => ({
              id: doc.id, // Document ID
              ...doc.data(), // Document data (fields)
            }));
            setItems(newItems);
            setLoading(false); // Data loaded, stop loading spinner
          } else {
            console.error('Snapshot is null or undefined');
            setLoading(false); // Stop loading spinner on error
          }
        },
        error => {
          console.error('Error fetching snapshot: ', error);
          Alert.alert('Error', 'Failed to fetch inventory data');
          setLoading(false); // Stop loading spinner on error
        },
      );

    return () => unsubscribe();
  }, []);

  const handleCategoryPress = category => {
    setSelectedCategory(category.name);
  };

  const filteredItems = items.filter(item => {
    if (selectedCategory) {
      return item.catagory === selectedCategory;
    }
    return (item['name'] || '').toLowerCase().includes(search.toLowerCase());
  });

  const sortedItems = () => {
    let sorted = filteredItems;
    switch (viewOption) {
      case 'category':
        return sorted.sort((a, b) =>
          (a.catagory || '').localeCompare(b.catagory || ''),
        );
      case 'amount':
        return sorted.sort((a, b) => (b.amount || 0) - (a.amount || 0));
      case 'alphabet':
        return sorted.sort((a, b) =>
          (a.name || '').localeCompare(b.name || '', 'en', {
            sensitivity: 'base',
          }),
        );
      default:
        return sorted;
    }
  };

  // Define shades of light blue
  const shadesOfBlue = ['#d0e6f4', '#b3d7f3', '#9cc3f2'];

  // Custom renderItem function
  const renderItem = ({item, index}) => (
    <View
      style={[
        styles.item,
        styles.gridItem,
        {
          backgroundColor: shadesOfBlue[index % shadesOfBlue.length],
        },
      ]}>
      {/* Display the name without the label */}
      <Text style={styles.itemText}>{item['name'] || ' '}</Text>

      {/* Display the size without the label */}
      <Text style={styles.itemText}>{item.size || 'one size'}</Text>

      {/* Display the amount with a "+" sign instead of "Amount" */}
      <Text style={styles.itemText}>+ {item.amount || ' '}</Text>

      {/* Display the location with a custom image icon */}
      <View style={styles.row}>
        <Image
          source={require('../../../../../assets/images/location1.png')}
          style={styles.icon}
        />
        <Text style={styles.itemText}>{item.location || ' '}</Text>
      </View>
    </View>
  );

  const renderCategoryGrid = () => {
    return (
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() => handleCategoryPress(item)} // Add onPress handler
          >
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchAndButtonContainer}>
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
      </View>

      <View style={styles.viewOptionsContainer}>
        <TouchableOpacity
          style={[
            styles.viewOption,
            viewOption === 'category' && styles.selectedOption,
          ]}
          onPress={() => {
            setSelectedCategory(null); // Reset category selection
            setViewOption('category');
          }}>
          <Text>By Category</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewOption,
            viewOption === 'amount' && styles.selectedOption,
          ]}
          onPress={() => {
            setSelectedCategory(null); // Reset category selection
            setViewOption('amount');
          }}>
          <Text>By Amount</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewOption,
            viewOption === 'alphabet' && styles.selectedOption,
          ]}
          onPress={() => {
            setSelectedCategory(null); // Reset category selection
            setViewOption('alphabet');
          }}>
          <Text>By Alphabet</Text>
        </TouchableOpacity>
      </View>

      {viewOption === 'category' && !selectedCategory ? (
        renderCategoryGrid()
      ) : (
        <FlatList
          data={sortedItems()}
          key={'grid'} // Keep the key fixed as we're only using grid view now
          keyExtractor={item => item.id}
          numColumns={2} // Always show items in a grid with 2 columns
          renderItem={renderItem} // Use the custom renderItem function
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 90,
  },
  searchAndButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    padding: 8,
    flex: 0.7,
  },
  addButton: {
    flex: 0.3,
  },
  viewOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  viewOption: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: '#b3d7f3',
  },
  backButton: {
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
    margin: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  categoryBox: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  categoryImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default InventoryScreen;
