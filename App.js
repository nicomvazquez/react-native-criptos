import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

import CoinItem from "./components/coinItem.js";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

  const loadData = async () => {
    const rest = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
    );
    const data = await rest.json();
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />
      <View>
        <Text style={styles.title}>CrioptoPrices</Text>
      </View>
      <TextInput
        style={styles.search}
        placeholder="Search coin..."
        placeholderTextColor="#858585"
        onChangeText={(text) => setSearch(text)}
      />
      <FlatList
        style={styles.list}
        data={coins.filter(
          coin =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <CoinItem coin={item} />;
        }}
        refreshing={refresh}
        onRefresh={async () => {
          setRefresh(true);
          await loadData();
          setRefresh(false)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    alignItems: "center",
    flex: 1,
  },
  title: {
    color: "#fff",
    marginTop: 20,
    fontSize: 20,
  },
  list: {
    width: "90%",
  },
  search: {
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    width: "90%",
    textAlign: "center",
    margin: 20,
  },
});

export default App;
