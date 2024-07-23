import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Import the google-services.json configuration file
import firebaseConfig from '../android/app/google-services.json'; 

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); // Initialize with the configuration
}

export { firestore, auth };
