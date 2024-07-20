import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from './android/app/src/screens/Settings';
import HomeScreen from './android/app/src/screens/HomeScreen';

const Drawer = createDrawerNavigator();

export default function Index() {
  return(
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={HomeScreen}/>
        <Drawer.Screen name='Settings'component={Settings}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}