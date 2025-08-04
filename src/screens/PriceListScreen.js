import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Theme from '../utils/Theme';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@trade';

const PriceListScreen = () => {
  const [priceData, setPriceData] = useState([]);
  const webSocket = useRef(null);

  useEffect(() => {
    webSocket.current = new WebSocket(BINANCE_WS_URL);

    webSocket.current.onmessage = e => {
      const data = JSON.parse(e.data);
      const priceUpdate = {
        price: parseFloat(data.p).toFixed(2),
        time: new Date(data.T).toLocaleTimeString(),
      };

      setPriceData(prev => [priceUpdate, ...prev.slice(0, 19)]);
    };

    webSocket.current.onerror = e => console.error(e.message);
    webSocket.current.onclose = () => console.log('WebSocket Closed.');

    return () => {
      webSocket.current.close();
    };
  }, []);

  const renderItem = ({ item, index }) => {
    const prevPrice =
      index < priceData.length - 1
        ? parseFloat(priceData[index + 1].price)
        : null;
    const currPrice = parseFloat(item.price);
    const priceUp = prevPrice !== null && currPrice > prevPrice;

    return (
      <View
        style={[
          styles.card,
          { backgroundColor: priceUp ? Theme.priceUp : Theme.priceDown },
        ]}
      >
        <Text style={styles.price}>{item.price} USDT</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={priceData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: { paddingVertical: 20, backgroundColor: Theme.white },
  card: {
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 3,
  },
  price: { fontSize: 20, fontWeight: 'bold' },
  time: { fontSize: 14, color: Theme.lightBlack },
});

export default PriceListScreen;
