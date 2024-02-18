import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";
type ItemProps = { title: string };

const recents = [
  {
    id: "1",
    title: "Pasta",
  },
  {
    id: "2",
    title: "Pizza",
  },
  {
    id: "3",
    title: "Burger",
  },
  {
    id: "4",
    title: "Fries",
  },
  {
    id: "5",
    title: "Salad",
  },
];

const leaders = [
  {
    id: "1",
    title: "Mason",
  },
  {
    id: "2",
    title: "Dylan",
  },
  {
    id: "3",
    title: "Mudit",
  },
  {
    id: "4",
    title: "Ayush",
  },
  {
    id: "5",
    title: "Colin",
  },
];


export function HomeScreen() {
  // let [recents, setRecentFood] = useState(null);
  // let [leaders, setLeaderboard] = useState(null);

  // useEffect(() => {
  //   fetch("https://dog.ceo/api/breeds/image/random")
  //     .then((response) => response.json())
  //     .then((data) => setRecentFood(data.message));
  // }, []);

  // useEffect(() => {
  //   fetch("https://dog.ceo/api/breeds/image/random")
  //     .then((response) => response.json())
  //     .then((data) => setLeaderboard(data.message));
  // }, []);

  return (
    <ScrollView>
      <View style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
        <ScoreCard />
        <RecentFood />
        <ScoreBoard />
      </View>
    </ScrollView>
  );
}

function ScoreCard() {
  return (
    <View style={styles.cardRow}>
      <Text style={styles.title}>My Score</Text>
      <Text style={styles.content}>6.8</Text>
    </View>
  );
}

function RecentFood() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recent Food</Text>
      <FlatList
        data={recents}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.content}></Text>
    </View>
  );
}

function ScoreBoard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Top Friends</Text>
      <FlatList
        data={leaders}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.content}></Text>
    </View>
  );
}

const Item = ({ title }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

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
