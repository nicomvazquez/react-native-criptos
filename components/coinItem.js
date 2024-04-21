import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const coinItem = ({ coin }) => {
  return (
    <View style={styles.containerItem}>
      <View style={styles.coinInfo}>
        <Image style={styles.image} source={{ uri: coin.image }} />
        <View>
          <Text style={styles.text}>{coin.name}</Text>
          <Text style={styles.textSimbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.price}>${coin.current_price}</Text>
        <Text
          style={[
            coin.price_change_percentage_24h > 0
              ? styles.priceUp
              : styles.priceDown,
          ]}
        >
          {coin.price_change_percentage_24h}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "#121212",
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  textSimbol: {
    color: "#434343",
    textTransform: "uppercase",
  },
  coinInfo: {
    flexDirection: "row",
    gap: 15,
  },
  image: {
    width: 40,
    height: 40,
  },
  price: {
    color: "#fff",
    textAlign: "right",
  },
  priceUp: {
    color: "#58D68D",
    textAlign: "right",
  },
  priceDown: {
    color: "#E74C3C",
    textAlign: "right",
  },
});

export default coinItem;
