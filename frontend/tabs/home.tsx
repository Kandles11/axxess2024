import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
type ItemProps = {title: string};

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

export function HomeScreen() {
    return (
        <ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    )
  }

  function RecentFood() {
    return (
        <View style={styles.card}>
      <Text style={styles.title}>Recent Food</Text>
      <FlatList data={DATA} renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}/>
      <Text style={styles.content}></Text>
    </View>
    )
  }

  function ScoreBoard() {
    return (
        <View style={styles.card}>
      <Text style={styles.title}>Top Friends</Text>
      <FlatList data={DATA} renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}/>
      <Text style={styles.content}></Text>
    </View>
    )
  }

  const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

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
  

