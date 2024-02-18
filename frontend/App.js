import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScanWebScreen } from './tabs/scanweb';
import { HomeScreen } from './tabs/home';
import { DataScreen } from './tabs/data';

let ScanScreen;
import('./tabs/scanios')
  .then((module) => { ScanScreen = module.ScanIosScreen })
  .catch((err) => {
    console.info('Could not import ios camera module.');
    ScanScreen = ScanWebScreen;
  });

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scanning" component={ScanScreen} />
      <Tab.Screen name="Charts" component={DataScreen} />

    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
