import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DashboardScreen from '../../screens/DashboardScreen';
import PriceListScreen from '../../screens/PriceListScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Prices" component={PriceListScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;