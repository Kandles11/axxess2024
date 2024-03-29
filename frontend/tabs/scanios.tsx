import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppState } from '@react-native-community/hooks';
// import { AutoFocus, Camera, CameraType } from 'expo-camera';
import { Camera, useCameraPermission, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { onCodeScan } from './scancommon';
import FoodView from './foodview';


export function ScanIosScreen() {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [scannedData, setScannedData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [foodInfo, setFoodInfo] = useState({ name: "", calories: 0, score: 0 });

  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13'],
    onCodeScanned: (codes) => {{
      codes = codes.filter((value)=>(value.value != null));
      console.log(`Scanned ${codes.length} codes!`);
      if (codes.length > 0) {
        let value = codes[0].value;
        setScannedData(value);
        onCodeScan(value, setFoodInfo);
        setIsModalVisible(true);
      } else {
        setScannedData("");
      }
      }
    }
  });

  const onModalClose = () => {
    setIsModalVisible(false);
    setScannedData("");
  }

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === "active" && !isModalVisible;

  if (!hasPermission) {
    requestPermission();
    return (
      <View style={styles.container}>
        <Text style={styles.text}>SnackIt needs permission to access your camera.</Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>SnackIt was unable to find your camera.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} device={device} isActive={isActive} codeScanner={codeScanner}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>{scannedData}</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <FoodView isVisible={isModalVisible} data={scannedData} info={foodInfo} onClose={onModalClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});