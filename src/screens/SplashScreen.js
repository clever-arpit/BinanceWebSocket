import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import Theme from '../utils/Theme';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Binance Tracker</Text>
      <Text style={styles.subtitle}>Real-time Crypto Prices</Text>
      <ActivityIndicator
        size="large"
        color={Theme.primary}
        style={styles.loader}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Theme.lightBlack,
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});
