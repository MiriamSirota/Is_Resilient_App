import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function MySpace() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = await firestore().collection('events').get();
        const eventsData = eventsCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      } catch (error) {
        Alert.alert('Error', 'Could not fetch events');
        console.error('Error fetching events:', error); // Debug log
      }
    };

    fetchEvents();
  }, []);

  const handleImagePress = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>Event Archive</Text>
      {events.map((event, index) => (
        <View key={event.id} style={styles.eventBox}>
          <Text style={styles.eventText}>Event: {event.name}</Text>
          <Text style={styles.eventText}>Date: {event.date}</Text>
          <ScrollView horizontal style={styles.photoGallery}>
            {event.photos &&
              event.photos.map((photo, photoIndex) => (
                <TouchableOpacity
                  key={photoIndex}
                  style={styles.photoItem}
                  onPress={() => handleImagePress({uri: photo})}>
                  <Image source={{uri: photo}} style={styles.photo} />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      ))}

      {selectedImage && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <Image
              source={selectedImage}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#0d7178',
  },
  eventBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 2,
  },
  eventText: {
    fontSize: 16,
    color: '#333',
  },
  photoGallery: {
    marginTop: 10,
  },
  photoItem: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  photo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  fullImage: {
    width: '90%',
    height: '70%',
  },
});
