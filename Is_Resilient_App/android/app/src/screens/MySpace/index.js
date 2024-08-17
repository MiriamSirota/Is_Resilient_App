import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [eventsAttended] = useState([
    { name: 'BBQ 999 Brigade', date: '2024-07-17', photos: [] },
    { name: 'AC Giving to 800 Brigade', date: '2024-07-17', photos: [] },
    // Add more events as needed
  ]);

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
      <Text style={styles.sectionHeader}>My Events</Text>
      {eventsAttended.map((event, index) => (
        <View key={index} style={styles.eventBox}>
          <Text style={styles.eventText}>Event: {event.name}</Text>
          <Text style={styles.eventText}>Date: {event.date}</Text>
          <ScrollView horizontal style={styles.photoGallery}>
            {event.photos.map((photo, photoIndex) => (
              <TouchableOpacity
                key={photoIndex}
                style={styles.photoItem}
                onPress={() => handleImagePress(photo)}>
                <Image source={photo} style={styles.photo} />
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
