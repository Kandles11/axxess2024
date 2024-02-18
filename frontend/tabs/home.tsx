import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";
import { SERVER_IP, USERID } from "../consts";
import { useIsFocused } from '@react-navigation/native';


type ItemProps = { title: string; score: number };

export function HomeScreen() {
  let [recents, setRecentFood] = useState(null);
  let [leaders, setLeaderboard] = useState(null);

  const fetchData = async () => {
    fetch(`${SERVER_IP}/v1/food/user/${USERID}?n=4`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data); // Check the data returned by the API
        setRecentFood(data);
      });

    fetch(`${SERVER_IP}/v1/users/leaderboard/4`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data); // Check the data returned by the API
        setLeaderboard(data);
      });
  };

  const isFocused = useIsFocused()

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  return (
    <ScrollView>
      <View
        style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View style={{ justifyContent: "center", margin: 30 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome,</Text>
          <Text style={{ fontSize: 36, fontWeight: "bold" }}>Mason!</Text>
        </View>
        <View style={{margin: 5 , flexDirection: "column", justifyContent: "center", width:"80%"}}>
          <ScoreCard />
          <StreakCard />
        </View>
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

function StreakCard() {
  return (
    <View style={styles.cardRow}>
      <Text style={styles.title}>Streak</Text>
      <Text style={styles.content}>2</Text>
      <Image
        source={require("../assets/flame.png")}
        style={{marginLeft:10, marginBottom: 0 }}
      ></Image>
    </View>
  );
}

function RecentFood({ recents }) {
  console.log("recents", recents);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recent Food</Text>
      {recents &&
        recents.map((item) => (
          <Item key={item.id} title={item.name} score={item.score} />
        ))}
    </View>
  );
}

function ScoreBoard({ leaders }) {
  console.log("leaders ", leaders);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Top Friends</Text>
      {leaders &&
        leaders.map((item) => (
          <Item key={item.id} title={item.name} score={item.todayScore} />
        ))}
    </View>
  );
}

const Item = ({ title, score }: ItemProps) => (
  <View style={styles.item}>
    <View style={{width: "80%"}}>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View
      style={{
        backgroundColor:
          score == 0 ? "#000000": score <= 3 ? "#D22B2B" : score <= 6 ? "#E49B0F" : "#097969",
        borderRadius: 20,
        marginLeft: "auto",
        padding: 20, 
      }}
    >
      <Text style={styles.accentText}>{score}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: "95%",
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
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 5,
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
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  content: {
    marginLeft: "auto",
    fontSize: 20,
    fontWeight: "600",
  },
  item: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "#dadada",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  accent: {
    borderRadius: 20,
    marginLeft: "auto",
    padding: 5,
  },
  accentText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
