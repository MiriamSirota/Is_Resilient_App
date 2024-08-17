// src/context/AuthContext.js
import React, {createContext, useContext, useState, useEffect} from 'react';
import {auth, firestore} from '../../../../config/firebase';
import {useNavigation} from '@react-navigation/native';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        const unsub = firestore()
          .collection('someCollection')
          .onSnapshot(snapshot => {
            // Handle snapshot
          });
        // Ensure `subscriptions` only stores valid functions
        setSubscriptions(prevSubs => [...prevSubs, unsub].filter(Boolean));
      } else {
        setUser(null);
        setSubscriptions([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      // Clone the subscriptions array, filtering out any null or undefined values
      const localSubscriptions = subscriptions
        ? subscriptions.filter(Boolean)
        : [];

      console.log('localSubscriptions before logout:', localSubscriptions);

      if (localSubscriptions && Array.isArray(localSubscriptions)) {
        localSubscriptions.forEach((unsubscribe, index) => {
          if (typeof unsubscribe === 'function') {
            try {
              unsubscribe();
              console.log(`Successfully unsubscribed [${index}]`);
            } catch (unsubscribeError) {
              console.error(
                `Error unsubscribing [${index}]:`,
                unsubscribeError,
              );
            }
          } else {
            console.error(
              `localSubscriptions[${index}] is not a function:`,
              typeof unsubscribe,
            );
          }
        });
      } else {
        console.warn(
          'localSubscriptions is not an array or is undefined:',
          localSubscriptions,
        );
      }

      await auth().signOut();
      setUser(null);
      setSubscriptions([]); // Reset to an empty array

      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{user, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};
