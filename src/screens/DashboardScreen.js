import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  Button,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Theme from '../utils/Theme';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@trade';

const DashboardScreen = ({ navigation }) => {
  const [graphData, setGraphData] = useState([]);
  const webSocket = useRef(null);

  useEffect(() => {
    webSocket.current = new WebSocket(BINANCE_WS_URL);

    webSocket.current.onmessage = e => {
      const data = JSON.parse(e.data);
      const price = parseFloat(data.p);

      setGraphData(prev => {
        const updated = [...prev, price];
        return updated.length > 30 ? updated.slice(-30) : updated;
      });
    };

    webSocket.current.onerror = e => console.error(e.message);
    webSocket.current.onclose = () => console.log('WebSocket Closed.');

    return () => {
      webSocket.current.close();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>BTC/USDT Price Graph</Text>
      {graphData.length > 1 && (
        <LineChart
          data={{
            labels: [], // Index-based labels
            datasets: [{ data: graphData }],
          }}
          width={Dimensions.get('window').width - 20}
          height={220}
          yAxisSuffix=" USDT"
          chartConfig={{
            backgroundColor: Theme.white,
            backgroundGradientFrom: Theme.white,
            backgroundGradientTo: Theme.white,
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: '3', strokeWidth: '2', stroke: Theme.warning },
          }}
          bezier
          style={{ margin: 8, borderRadius: 16 }}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Prices')}
      >
        <Text style={styles.buttonText}>Go to Prices List</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: Theme.white,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: Theme.primary,
    shadowColor: Theme.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.white,
  },
});

export default DashboardScreen;
