import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  Alert,
  FlatList,
  Button,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useNavigation} from '@react-navigation/native';
import {
  auth,
  firestore,
  uploadImageToFirebase,
  fetchGalleryImages,
} from '../../../../../config/firebase';
import {useAuth} from '../../context/AuthContext';
import {launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';


const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [todayEvents, setTodayEvents] = useState([]);
  const [events, setEvents] = useState({});
  const {handleLogout} = useAuth();
  const [activeTab, setActiveTab] = useState('news'); // tabs
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  useEffect(() => {
    let unsubscribe; // Declare unsubscribe variable

    const fetchEvents = () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        unsubscribe = firestore()
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

                // Set selectedDay to today if it's not already set
                const today = moment().format('YYYY-MM-DD');
                setSelectedDay(today);

                // Automatically set today's events
                setTodayEvents(eventsData[today] || []);
              } else {
                console.warn('Snapshot is empty or undefined:', snapshot);
                setEvents({});
                setTodayEvents([]); // Clear today's events if snapshot is invalid or empty
              }
            },
            error => {
              if (error.code === 'permission-denied') {
                console.error('Permission denied error:', error);
              } else {
                console.error('Error fetching events from Firestore:', error);
              }
            },
          );
      } else {
        setEvents([]);
        setTodayEvents([]); // Clear today's events if user is not authenticated
      }
    };

    fetchEvents();

    const loadGalleryImages = async () => {
      const images = await fetchGalleryImages();
      setGalleryImages(images);
    };

    loadGalleryImages();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [auth().currentUser]);

  const handleImagePress = image => {
    setSelectedMedia(image);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedMedia(null);
  };

  const handleDayPress = day => {
    setSelectedDay(day.dateString);
    const eventsForDay = events[day.dateString] || [];
    setTodayEvents(eventsForDay);
  };

  const handleSignUp = async (event) => {
    if (!event || !event.name || !event.location) {
      Alert.alert('Error', 'Invalid event data.');
      console.error('Invalid event data:', event);
      return;
    }
  
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
          events: [{ ...event }],
        });
      } else {
        const userData = userDoc.data();
        const updatedEvents = [...(userData.events || []), { ...event }];
  
        await userDocRef.update({
          events: updatedEvents,
        });
      }
  
      Alert.alert(
        'Signed Up',
        `You have signed up for ${event.name} at ${event.location}!`
      );
    } catch (error) {
      console.error('Error signing up for event:', error); // This will log the exact error
      Alert.alert(
        'Error',
        'There was a problem signing up for the event. Please try again.'
      );
    }
  };
  

  const markedDates = Object.keys(events).reduce((acc, date) => {
    acc[date] = {dots: [{color: 'blue'}]};
    return acc;
  }, {});

  const handleImagePicker = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const handleUpload = async () => {
    if (selectedImage) {
      try {
        const downloadURL = await uploadImageToFirebase(selectedImage);
        setGalleryImages(prevImages => [...prevImages, downloadURL]);
        alert('Image uploaded successfully!');
        setSelectedImage(null); // Clear the selected image after upload
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Image upload failed.');
      }
    }
  };

  const newsFeedItems = [
    {
      id: '1',
      image: require('../../../../../assets/images/Casualty.jpg'),
      headline: 'Casualty Officers Event',
      description:
        'Last week we had an event for casualty officers. Thank you to everyone who came and helped. The event was a huge success.',
    },
    {
      id: '2',
      image: require('../../../../../assets/images/ac.jpg'),
      headline: 'הכנסת מזגנים לעזה',
      description:
        'בימים האחרונים ארגון "חוסן ישראל", בתרומתם הנדיבה של יהודים מארה"ב, הכניס יחד עם הכוחות למעלה מ-100 מזגנים ניידים ומצננים כדי לסייע לכוחות בלחימה, ולייצר מרחבים נוחים יותר כדי להתרענן ולישון טוב בלילה.',
    },
    {
      id: '3',
      image: require('../../../../../assets/images/hanikra1.jpeg'),
      headline: 'BBQ to Brigade 999',
      description:
        'Last week we had an event for casualty officers. Thank you to everyone who came and helped. The event was a huge success.',
    },
  ];

  const renderNewsItem = ({item}) => (
    <View style={styles.newsItemContainer}>
      <Text style={styles.newsItemHeadline}>{item.headline}</Text>
      <Image source={item.image} style={styles.newsItemImage} />
      <Text style={styles.newsItemDescription}>{item.description}</Text>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'news':
        return (
          <FlatList
            data={newsFeedItems}
            renderItem={renderNewsItem}
            keyExtractor={item => item.id}
          />
        );
      case 'scheduledEvents':
        return (
          <FlatList
            ListHeaderComponent={
              <>
                <View style={styles.calendarContainer}>
                  <Text style={styles.sectionHeader}></Text>
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
                    <Text style={styles.noEventsText}>
                      No events for this day
                    </Text>
                  ) : (
                    todayEvents.map((event, index) => (
                      <View key={index} style={styles.eventBox}>
                        <View style={styles.eventRow}>
                          <Text style={styles.eventText}>{event.name}</Text>
                        </View>
                        <View style={styles.eventRow}>
                          <Image
                            source={require('../../../../../assets/images/location1.png')}
                            style={styles.icon}
                          />
                          <Text style={styles.eventText}>{event.location}</Text>
                        </View>
                        <View style={styles.eventRow}>
                          <Image
                            source={require('../../../../../assets/images/clock1.jpg')}
                            style={styles.icon}
                          />
                          <Text style={styles.eventText}>{event.time}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.signUpButton}
                          onPress={() => handleSignUp(event)}>
                          <Text style={styles.signUpButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                      </View>
                    ))
                  )}
                </View>
              </>
            }
            data={todayEvents}
            renderItem={() => <View />} // Empty view just to satisfy FlatList
            keyExtractor={(item, index) => index.toString()}
          />
        );
      case 'gallery':
        return (
          <View style={{flex: 1, padding: 10}}>
            <FlatList
              data={galleryImages}
              renderItem={renderMediaItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              columnWrapperStyle={styles.mediaRow}
            />
            {selectedImage && (
              <Image
                source={{uri: selectedImage}}
                style={{width: 100, height: 100, marginVertical: 10}}
              />
            )}
            <View style={styles.buttonBox}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleImagePicker}>
                <Text style={styles.buttonText}>+ add Image</Text>
              </TouchableOpacity>

              {selectedImage && (
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handleUpload}>
                  <Text style={styles.buttonText}>Upload Image</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const renderMediaItem = ({item}) => (
    <TouchableOpacity
      style={styles.mediaItem}
      onPress={() => handleImagePress({uri: item})}>
      <Image source={{uri: item}} style={styles.media} />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('news')}
          style={styles.tab}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'news' && styles.activeTabText,
            ]}>
            News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('scheduledEvents')}
          style={styles.tab}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'scheduledEvents' && styles.activeTabText,
            ]}>
            Scheduled Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('gallery')}
          style={styles.tab}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'gallery' && styles.activeTabText,
            ]}>
            Gallery
          </Text>
        </TouchableOpacity>
      </View>
      {renderContent()}

      {selectedMedia && (
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
              source={{uri: selectedMedia.uri}}
              style={styles.fullMedia}
              resizeMode="contain"
            />
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#0d7178',
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },

  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#333',
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
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  eventText: {
    fontSize: 16,
    color: '#333',
  },
  signUpButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mediaRow: {
    justifyContent: 'space-between',
  },
  mediaItem: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    height: 200,
  },
  media: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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
    zIndex: 1,
    margin: 10,
  },
  closeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  fullMedia: {
    width: '90%',
    height: '70%',
  },
  newsItemContainer: {
    marginBottom: 20,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  newsItemImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  newsItemHeadline: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#0d7178',
    marginBottom: 20,
  },
  newsItemDescription: {
    fontSize: 18,
    color: '#555',
    lineHeight: 22,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  clearButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
});
