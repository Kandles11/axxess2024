import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SERVER_IP, USERID } from '../consts';

export default function FoodView({ isVisible, data, info, onClose }) {

  const postFoodAndClose = (data, info) => {
    let temp = {
        "user": USERID,
        "barcode": data,
        "calories": info.calories,
        "score": info.score,
        "name": info.name
    }
    fetch(`${SERVER_IP}/v1/food/`, {
      method: "POST", body: JSON.stringify(temp), headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Posted food info", info);
      });

    onClose();
  }

  return (
    <Modal animationType="none" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Info:</Text>
          <Text style={styles.text}>Name: {info.name}</Text>
          <Text style={styles.text}>Calories: {info.calories}</Text>
          <Text style={styles.text}>Health Factor: {info.score}</Text>
          <View style={styles.buttonContainer}>
            <Pressable onPress={()=>postFoodAndClose(data, info)}>
              <Text style={styles.mainButton}>Add Food</Text>
            </Pressable>
            <Pressable onPress={onClose}>
              <Text style={styles.button}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '100%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    justifyContent: 'center',
  },
  titleContainer: {
    height: '100%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainButton: {
    backgroundColor: 'green',
    color: 'black',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: 'white',
    color: 'black',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});

// const styles = StyleSheet.create({
//   modalContent: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   titleContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });
