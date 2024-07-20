import firebase from 'firebase/app';
import 'firebase/auth'; // Import Firebase Authentication module
import 'firebase/database'; // Import Firebase Realtime Database module, if needed

// Import the google-services.json configuration file
import * as firebaseConfig from '../android/app/google-services.json';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig.default); // Assuming firebaseConfig is exported as default
}

export default firebase;
