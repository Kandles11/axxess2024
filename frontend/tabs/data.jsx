import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useWindowDimensions } from 'react-native';
// const windowWidth = useWindowDimensions().width;
// const windowHeight = useWindowDimensions().height;

const styles = StyleSheet.create({

  card: {
      width: "80%",
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 10,
      marginHorizontal: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  cardRow: {
    width: "80%",
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: "center"
  },
  content: {
      marginLeft: "auto",
    fontSize: 16,
  },
  item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
});


export function DataScreen() {
  return (
    <View>
      <Text style = {styles.title}>Calorie Tracker</Text>

      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43]
            }
          ]}}
        width={useWindowDimensions().width * 0.8} // from react-native
        height={useWindowDimensions().height/3}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          margin:"20px",
          backgroundGradientFrom: "#d9d907",
          backgroundGradientTo: "#bfbf08",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 0.5) => `rgba(255, 255, 255, 0.5)`,
          labelColor: (opacity = 0.5) => `rgba(255, 255, 255, 1)`,
          style: {
            borderRadius: 16,
            margin: "20px"
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          marginHorizontal: 10,
          borderRadius: 16,
          alignSelf: "center"
        }}
      />

      <BarChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43]
            }
          ]}}
        width={useWindowDimensions().width * 0.8} // from react-native
        height={useWindowDimensions().height/3}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          margin:"20px",
          backgroundGradientFrom: "#d9d907",
          backgroundGradientTo: "#bfbf08",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 0.5) => `rgba(255, 255, 255, 0.5)`,
          labelColor: (opacity = 0.5) => `rgba(255, 255, 255, 1)`,
          style: {
            borderRadius: 16,
            margin: "20px"
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          marginHorizontal: 10,
          borderRadius: 16,
          alignSelf: "center"
        }}
      />

    </View>

  );
}
