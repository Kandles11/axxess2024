import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Platform, View, Image} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScanWebScreen } from "./tabs/scanweb";
import { HomeScreen } from "./tabs/home";
import { DataScreen } from "./tabs/data";

let ScanScreen;
import("./tabs/scanios")
  .then((module) => {
    ScanScreen = module.ScanIosScreen;
  })
  .catch((err) => {
    console.info("Could not import ios camera module.");
    ScanScreen = ScanWebScreen;
  });

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 90 },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          title: "",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: "transparent",
          },

          tabBarIcon: () => {
            return <View style={{alignContent: "center"}}>
              <HomeIcon />
              <Text fontSize={10}>Home</Text>
            </View>;
          },
        }}
        component={HomeScreen}
      />
      <Tab.Screen name="Scanner"
        options={{
          title: "",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: "transparent",
          },

          tabBarIcon: () => {
            return <View style={{alignContent: "center"}}>
              <BarcodeIcon />
              <Text fontSize={10}>Scan</Text>
            </View>;
          },
        }} component={ScanScreen} />
        
      <Tab.Screen name="Charts" component={DataScreen} options={{
        title: "",
        tabBarIcon: () => {
            return <View style={{alignContent: "center"}}>
              <ChartIcon />
              <Text fontSize={10}>Charts</Text>
            </View>;
      },
    }} />
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

function HomeIcon() {
  return ( 
  <View>
    <Image source={require('./assets/house.png')}></Image>
  </View>
  );
}

function BarcodeIcon() {
  return (
    <View>
      <Image source={require('./assets/barcode.png')}></Image>
    </View>
  );
}

function ChartIcon() {
  return (
    <View>
      <Image source={require('./assets/chart.png')}></Image>
    </View>
  );
}