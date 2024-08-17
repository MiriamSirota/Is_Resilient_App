import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig); // Initialize with the configuration
// }

// Function to upload an image to Firebase Storage
export const uploadImageToFirebase = async imageUri => {
  const storageRef = storage().ref(`gallery/${Date.now()}.jpg`);

  const response = await fetch(imageUri);
  const blob = await response.blob();

  await storageRef.put(blob);
  const downloadURL = await storageRef.getDownloadURL();

  return downloadURL;
};

// Function to fetch all image URLs from Firebase Storage
export const fetchGalleryImages = async () => {
  const storageRef = storage().ref('gallery');
  const result = await storageRef.listAll();
  const imageUrls = await Promise.all(
    result.items.map(async imageRef => {
      return await imageRef.getDownloadURL();
    }),
  );
  return imageUrls;
};

export {firestore, auth, storage};
