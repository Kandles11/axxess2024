import { StatusBar } from "expo-status-bar";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
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
import { useWindowDimensions } from "react-native";
// const windowWidth = useWindowDimensions().width;
// const windowHeight = useWindowDimensions().height;

const styles = StyleSheet.create({
  card: {
    width: "80%",
    backgroundColor: "white",
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
  cardRow: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    flexDirection: "row",
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
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  content: {
    marginLeft: "auto",
    fontSize: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export function DataScreen() {
  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Calorie Tracker</Text>

        <LineChart
          data={{
            labels: [
              "Friday",
              "Saturday",
              "Sunday",
            ],
            datasets: [
              {
                data: [986, 654, 750],
              },
            ],
          }}
          width={useWindowDimensions().width * 0.8} // from react-native
          height={useWindowDimensions().height / 3}
          yAxisSuffix=" kcal"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            margin: "20px",
            backgroundGradientFrom: "#097969",
            backgroundGradientTo: "#088F8F",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 0.8) => `rgba(255, 255, 255, 0.9)`,
            labelColor: (opacity = 0.5) => `rgba(255, 255, 255, 1)`,
            style: {
              borderRadius: 16,
              margin: "20px",
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#FFFFFF",
            },
          }}
          bezier
          style={{
            fontFamily: "Arial",
            marginVertical: 8,
            marginHorizontal: 8,
            borderRadius: 16,
            alignSelf: "center",
          }}
        />

        <Text style={styles.title}>Average Weekly Score</Text>
        <BarChart
          data={{
            labels: [
              "Friday",
              "Saturday",
              "Sunday",
            ],
            datasets: [
              {
                data: [8, 6, 4],
              },
            ],
          }}
          width={useWindowDimensions().width * 0.8} // from react-native
          height={useWindowDimensions().height / 3}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#097969",
            margin: "20px",
            backgroundGradientFrom: "#e26a00",
            backgroundGradientTo: "#bfbf08",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 2) => `rgba(255, 255, 255, 1)`,
            labelColor: (opacity = 0.5) => `rgba(255, 255, 255, 1)`,
            style: {
              borderRadius: 16,
              margin: "20px",
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            fontFamily: "Arial",
            marginVertical: 8,
            marginHorizontal: 10,
            borderRadius: 16,
            alignSelf: "center",
          }}
        />
      </View>
    </ScrollView>
  );
}
