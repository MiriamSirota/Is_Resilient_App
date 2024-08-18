import {useNavigation} from '@react-navigation/native';
import {auth} from '../.././../../../config/firebase';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Settings() {
  const user = auth().currentUser;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [eventsAttended, setEventsAttended] = useState([
    {name: 'BBQ 999 Brigade', date: '2024-07-17', photos: []},
    {name: 'AC Giving to 800 Brigade', date: '2024-07-17', photos: []},
    // Add more events as needed
  ]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setName(userData.name);
            setEmail(user.email);
          } else {
            Alert.alert('Error', 'User not found');
          }
        } catch (error) {
          Alert.alert('Error', 'Could not fetch user details');
        }
      } else {
        Alert.alert('Error', 'No authenticated user');
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleSaveChanges = async () => {
    try {
      if (email !== user.email) {
        await user.updateEmail(email);
      }
      if (password) {
        await user.updatePassword(password);
      }
      await firestore().collection('users').doc(user.uid).update({name});
      Alert.alert('Success', 'User details updated');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleImagePress = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../../../../assets/images/profile1.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Full Name</Text>
          <TextInput
            style={styles.box}
            value={name}
            onChangeText={setName}
            placeholder="Change Name"
          />
          <Text style={styles.text}>Email Address</Text>
          <TextInput
            style={styles.box}
            value={email}
            onChangeText={setEmail}
            placeholder="Change Email"
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.box}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Change Password"
          />

          <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
            <Text style={styles.text1}> Save Changes </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeader}>My Events History</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileContainer: {
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
  },
  text1: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  box: {
    borderBottomWidth: 1,
    padding: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0d7178',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
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
