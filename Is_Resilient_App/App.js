import React from 'react';
import AppNavigation from './navigation/appNavigation.js';
import {AuthProvider} from './android/app/src/context/AuthContext.js'; // Import the AuthProvider
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
