import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  Alert,
  Button,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomDrawerContent from '../../../../../navigation/CustomDrawerContent';
import {auth, firestore} from '../../../../../config/firebase';
import {useAuth} from '../../context/AuthContext';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [todayEvents, setTodayEvents] = useState([]);
  const [events, setEvents] = useState({});
  const {handleLogout} = useAuth();

  useEffect(() => {
    // Set up a real-time listener for events
    const unsubscribe = firestore()
      .collection('events')
      .onSnapshot(
        snapshot => {
          if (snapshot && !snapshot.empty) {
            const eventsData = {};

            snapshot.forEach(doc => {
              const event = doc.data();
              const eventDate = event.date;

              if (!eventsData[eventDate]) {
                eventsData[eventDate] = [];
              }

              eventsData[eventDate].push({
                name: event.name,
                location: event.location,
                time: event.time,
              });
            });

            setEvents(eventsData);
          } else {
            console.warn('Snapshot is empty or undefined:', snapshot);
            setEvents({}); // Clear events if snapshot is invalid or empty
          }
        },
        error => {
          console.error('Error fetching events from Firestore:', error);
        },
      );

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleImagePress = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const handleDayPress = day => {
    setSelectedDay(day.dateString);
    const eventsForDay = events[day.dateString] || [];
    setTodayEvents(eventsForDay);
  };

  const handleSignUp = async event => {
    try {
      const currentUser = auth().currentUser;

      if (!currentUser) {
        Alert.alert('Error', 'You need to be logged in to sign up for events.');
        return;
      }

      const userId = currentUser.uid;
      const userDocRef = firestore().collection('users').doc(userId);

      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        await userDocRef.set({
          events: [
            {...event, signedUpAt: firestore.FieldValue.serverTimestamp()},
          ],
        });
      } else {
        await userDocRef.update({
          events: firestore.FieldValue.arrayUnion({
            ...event,
            signedUpAt: firestore.FieldValue.serverTimestamp(),
          }),
        });
      }

      Alert.alert(
        'Signed Up',
        `You have signed up for ${event.name} at ${event.location}!`,
      );
    } catch (error) {
      console.error('Error signing up for event:', error); // This will log the exact error
      Alert.alert(
        'Error',
        'There was a problem signing up for the event. Please try again.',
      );
    }
  };

  const markedDates = Object.keys(events).reduce((acc, date) => {
    acc[date] = {dots: [{color: 'blue'}]};
    return acc;
  }, {});

  const photos = [
    require('../../../../../assets/images/hanikra1.jpeg'),
    require('../../../../../assets/images/hanikra2.jpeg'),
    require('../../../../../assets/images/hanikra3.jpeg'),
    require('../../../../../assets/images/hanikra4.jpeg'),
    require('../../../../../assets/images/hanikra5.jpeg'),
  ];

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const openPhotoModal = photo => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
    setModalVisible(false);
  };

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Text style={styles.sectionHeader}>Events Scheduel</Text>
        <Calendar
          markedDates={markedDates}
          markingType={'multi-dot'}
          onDayPress={handleDayPress}
          style={styles.calendar}
        />
      </View>

      <View style={styles.eventDetailsContainer}>
        <Text style={styles.sectionHeader}>Event Details</Text>
        {todayEvents.length === 0 ? (
          <Text style={styles.noEventsText}>No events for this day</Text>
        ) : (
          todayEvents.map((event, index) => (
            <View key={index} style={styles.eventBox}>
              <Text style={styles.eventText}>Name: {event.name}</Text>
              <Text style={styles.eventText}>Location: {event.location}</Text>
              <Text style={styles.eventText}>Time: {event.time}</Text>
              <Button title="Sign Up" onPress={() => handleSignUp(event)} />
            </View>
          ))
        )}
      </View>

      <View style={styles.photoGalleryContainer}>
        <Text style={styles.sectionHeader}>Event Photos</Text>
        <ScrollView>
          {photos.map((photo, index) => (
            <TouchableOpacity
              key={index}
              style={styles.photoItem}
              onPress={() => handleImagePress(photo)}>
              <Image source={photo} style={styles.photo} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
    color: '#417e96',
  },
  calendarContainer: {
    marginBottom: 20,
  },
  calendar: {
    height: 350,
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
    elevation: 2,
  },
  eventDetailsContainer: {
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  noEventsText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 10,
  },
  eventBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
  },
  eventText: {
    fontSize: 16,
    color: '#333',
  },
  photoGalleryContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  photoItem: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: 200,
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
