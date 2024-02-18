import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";

type ItemProps = { title: string };

const USERID = "65d1476b45df61177410c65c";

export function HomeScreen() {
  let [recents, setRecentFood] = useState(null);
  let [leaders, setLeaderboard] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/v1/food/user/65d1476b45df61177410c65c?n=3", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data); // Check the data returned by the API
        setRecentFood(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/v1/users/leaderboard/3", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data); // Check the data returned by the API
        setLeaderboard(data);
      });
  }, []);

  return (
    <ScrollView>
      <View
        style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View style={{justifyContent:"center" ,margin: 30}}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome,</Text>
          <Text style={{ fontSize: 36, fontWeight: "bold" }}>Mason!</Text>
        </View>

        <ScoreCard />
        <RecentFood recents={recents} />
        <ScoreBoard leaders={leaders} />
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

function RecentFood({ recents }) {
  console.log("recents", recents);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recent Food</Text>
      {recents &&
        recents.map((item) => <Item key={item.id} title={item.name} />)}
      <Text style={styles.content}></Text>
    </View>
  );
}

function ScoreBoard({ leaders }) {
  console.log("leaders ",leaders);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Top Friends</Text>
      {leaders &&
        leaders.map((item) => <Item key={item.id} title={item.name} />)}
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
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 10,
  },
  content: {
    marginLeft: "auto",
    fontSize: 28,
    fontWeight: "600",
  },
  item: {
    borderRadius: 20,
    backgroundColor: "#dadada",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
