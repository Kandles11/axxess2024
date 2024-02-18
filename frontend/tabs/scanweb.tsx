import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppState } from '@react-native-community/hooks';
import { AutoFocus, BarCodeScanningResult, Camera, CameraType } from 'expo-camera';
// import { Camera, useCameraPermission, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { onCodeScan } from './scancommon';


export function ScanWebScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scannedData, setScannedData] = useState("");

  let onCodeScanned = (code: BarCodeScanningResult) => {{
    setScannedData(code.data);
    onCodeScan(code.data);
  }};

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === "active";

  if (!permission || !permission.granted) {
    requestPermission();
    return (
      <View style={styles.container}>
        <Text style={styles.text}>SnackIt needs permission to access your camera.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back} onBarCodeScanned={onCodeScanned}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>{scannedData}</Text>
          </TouchableOpacity>
        </View>
      </Camera>
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